sap.ui.define(
  ['luigi/demo/persondetails/controller/BaseController'],
  function (Controller) {
    'use strict';

    return Controller.extend('luigi.demo.persondetails.controller.App', {
      onInit: function () {
      },

      onPressDetail: function (oEvent) {
        this.navTo('detail');
      }
    });
  }
);
