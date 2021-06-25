exports.launch = async (services, o) => {
  // pretty standard express server.js....
  const odatav2proxy = require('@sap/cds-odata-v2-adapter-proxy');
  const express = require('express');
  const cds = require('@sap/cds');

  const { PORT = 5005 } = process.env;
  const app = express();

  app.use('/', express.static('app'));

  await cds.connect((!cds.db && cds.env.requires.db) || false);
  cds.serve('all').in(app);

  app.use(odatav2proxy({ port: PORT }));

  return app.listen(PORT, () =>
    console.info(`server listening on http://localhost:${PORT}`)
  );
};

if (!module.parent) exports.launch();
