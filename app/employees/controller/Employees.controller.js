sap.ui.define(
  ['luigi/demo/employees/controller/BaseController'],
  function (Controller) {
    'use strict';

    return Controller.extend('luigi.demo.employees.controller.Employees', {
      onPressEdit: function (oEvent) {
        var id = oEvent.getSource().getBindingContext().getProperty('ID');
        this.getRouter().navTo('edit', { id: id });
      },

      onAdd: function (oEvent) {
        this.getRouter().navTo('add');
      }
    });
  }
);
