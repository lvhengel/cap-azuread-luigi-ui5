// const cds = require('@sap/cds');

module.exports = async (srv) => {
  // Function Import userInfo()

  srv.before('READ', 'Persons', async (req) => {
    if (req.user.is('Employee')) {
      // Return only own data
      req.query.where({ email: req.user.email });
    } else if (req.user.is('Manager')) {
      // Return only unit data
      req.query.where({ unit_ID: req.user.unit_ID });
    }
  });

  srv.on('userinfo', (req) => {
    return {
      id: req.user.id,
      email: req.user.email,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      role: req.user.role,
      unit_ID: req.user.unit_ID
    };
  });
};
