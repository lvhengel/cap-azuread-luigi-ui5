sap.ui.define(
  ['luigi/demo/persondetails/controller/BaseController'],
  function (Controller) {
    'use strict';

    return Controller.extend('luigi.demo.persondetails.controller.App', {
      onInit: function () {
        //debugger;
        // this.getRouter()
        //   .getRoute('RouteMainView')
        //   .attachPatternMatched(this._onDetailMatched, this);
        //debugger;
      },

      onPressDetail: function (oEvent) {
        this.navTo('detail');
      }
    });
  }
);
