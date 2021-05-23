const cds = require('@sap/cds');
const DEBUG = cds.debug('cds-azure-ad');
const passport = require('passport');
const config = require('./config');

var OIDCBearerStrategy = require('passport-azure-ad').BearerStrategy;

const AzureADUser = class extends cds.User {
  is(role) {
    DEBUG && DEBUG('Requested role: ' + role);
    return this._roles[role];
  }
};

module.exports = async (req, res, next) => {
  var options = {
    // The URL of the metadata document for your app. We will put the keys for token validation from the URL found in the jwks_uri tag of the in the metadata.
    identityMetadata: config.creds.identityMetadata,
    clientID: config.creds.clientID,
    validateIssuer: config.creds.validateIssuer,
    issuer: config.creds.issuer,
    passReqToCallback: config.creds.passReqToCallback,
    audience: config.creds.audience,
    loggingLevel: config.creds.loggingLevel,
    loggingNoPII: true
  };

  passport.initialize();
  passport.use(
    new OIDCBearerStrategy(options, function (token, done) {
      DEBUG && DEBUG('verifying the user');
      DEBUG && DEBUG(token, 'was the token retreived');
      var user = token.oid;
      return done(null, user, token);
    })
  );

  passport.authenticate('oauth-bearer', async function (err, user, token) {
    var capUser = {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      role: '',
      _roles: []
    };

    if (err) {
      DEBUG && DEBUG('err');
      DEBUG && DEBUG(err);
      return next(err);
    }
    if (!user) {
      DEBUG && DEBUG('No user');
      //return next(Error(token));
    } else {
      let email = token.preferred_username.toLowerCase(); // Contains email address

      const { Persons } = cds.entities;
      const person = await SELECT.one(Persons).where({ email: email });

      if (person) {
        capUser = {
          id: person.ID,
          email: email,
          firstname: person.firstname,
          lastname: person.lastname,
          role: person.role,
          unit_ID: person.unit_ID,
          _roles: ['authenticated-user']
        };

        capUser._roles.push(person.role);
      }
    }

    DEBUG && DEBUG(capUser);

    req.user = new AzureADUser(capUser);
    next();
  })(req, res, next);
};
