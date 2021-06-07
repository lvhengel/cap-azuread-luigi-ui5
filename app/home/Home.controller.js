sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/UIComponent',
    'luigi/demo/assets/luigi-client/luigi-client'
  ],
  function (Controller, UIComponent) {
    'use strict';

    return Controller.extend('luigi.demo.home.Home', {
      getRouter: function () {
        return UIComponent.getRouterFor(this);
      },

      onInit: function () {
        LuigiClient.addInitListener((initialContext) => {
          this.getView()
            .byId('idTitle')
            .setText(`Welcome ${LuigiClient.getContext().firstname}!`);
        });
        LuigiClient.addContextUpdateListener((updatedContext) => {
          console.log('Luigi Client Updated!');
        });
      }
    });
  }
);
