module.exports = async (srv) => {
  srv.before('CREATE', 'Persons', async (req) => {
    req.user.is('Employee') || req.reject(403);
  });

  srv.before('UPDATE', async (req) => {
    req.data.email === req.user.email ||
      req.reject(403, 'Not authorized to change your own email address');
  });

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
