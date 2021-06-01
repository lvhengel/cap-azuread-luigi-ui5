sap.ui.define(
  ['luigi/demo/employees/controller/BaseController'],
  function (Controller) {
    'use strict';

    return Controller.extend('luigi.demo.employees.controller.Add', {
      onInit: function () {
        this.getRouter()
          .getRoute('add')
          .attachPatternMatched(this._onAddMatched, this);
      },

      _onAddMatched: function (oEvent) {
        var oContext = this.getModel().createEntry('Persons', {
          firstname: '',
          lastname: '',
          email: '',
          role: 'Employee',
          unit_ID: 1
        });

        this.getView().setBindingContext(oContext);
      },

      handleSavePress: function (oEvent) {
        // TODO: check why submitchanges doesn't work here
        //this.getView().getModel().submitChanges();
        var oContext = this.getView().getBindingContext();

        this.getModel().create('/Persons', {
          firstname: oContext.getProperty('firstname'),
          lastname: oContext.getProperty('lastname'),
          email: oContext.getProperty('email'),
          role: 'Employee',
          unit_ID: 1
        });

        this.getRouter().navTo('employees');
      },

      handleCancelPress: function (oEvent) {
        this.getRouter().navTo('employees');
      }
    });
  }
);
