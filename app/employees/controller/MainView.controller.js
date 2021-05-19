sap.ui.define(
  ['luigi/demo/employees/controller/BaseController'],
  function (Controller) {
    'use strict';

    return Controller.extend('luigi.demo.employees.controller.MainView', {
      onInit: function () {
        debugger;
      },

      onPressDetail: function (oEvent) {
        this.navTo('detail');
      }
    });
  }
);
