/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require(["luigi/demo/persondetails/test/integration/AllJourneys"], function () {
        QUnit.start();
    });
});
