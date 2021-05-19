sap.ui.define(["sap/ui/test/Opa5"], function (Opa5) {
    "use strict";

    return Opa5.extend("luigi.demo.persondetails.test.integration.arrangements.Startup", {
        iStartMyApp: function () {
            this.iStartMyUIComponent({
                componentConfig: {
                    name: "luigi.demo.persondetails",
                    async: true,
                    manifest: true
                }
            });
        }
    });
});
