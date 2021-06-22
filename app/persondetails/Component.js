sap.ui.define(
  [
    'sap/ui/core/UIComponent',
    'luigi/demo/persondetails/model/models',
    'sap/ui/model/odata/v2/ODataModel'
  ],
  function (UIComponent, models, ODataModel) {
    'use strict';

    return UIComponent.extend('luigi.demo.persondetails.Component', {
      metadata: {
        manifest: 'json'
      },

      /**
       * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
       * @public
       * @override
       */
      init: function () {
        var accessToken = LuigiClient.getToken();
        var personsUri = this.getManifestEntry(
          '/sap.app/dataSources/persons/uri'
        );
        var personsParameters = {
          headers: {
            Authorization: 'Bearer ' + accessToken
          },
          useBatch: false,
          defaultBindingMode: 'TwoWay',
          defaultUpdateMethod: 'Merge'
        };
        //};
        var oModel = new ODataModel(personsUri, personsParameters);
        this.setModel(oModel);

        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);

        // enable routing
        this.getRouter().initialize();

        // set the device model
        this.setModel(models.createDeviceModel(), 'device');

        // set the app model
        this.setModel(models.createAppModel(), 'app');
      }
    });
  }
);
