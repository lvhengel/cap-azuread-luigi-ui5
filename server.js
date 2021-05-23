'use strict';

//const cds = require('@sap/cds');
const helmet = require('helmet');
const cors = require('cors');
const proxy = require('@sap/cds-odata-v2-adapter-proxy');

// cds.on('bootstrap', (app) => {
//   app.use(helmet());
//   app.use(cors());
//   app.use(proxy());
// });

// module.exports = cds.server;

const cds = require('@sap/cds');
// react on bootstrapping events...
cds.on('bootstrap', (app) => {
  app.use(
    helmet({
      contentSecurityPolicy: false
    })
  );
  app.use(cors());
  app.use(proxy());
});
//cds.on('served', ...)
// handle and override options
module.exports = (o) => {
  //o.from = 'srv/precompiled-csn.json';
  o.app = require('express')();
  return cds.server(o); //> delegate to default server.js
};
