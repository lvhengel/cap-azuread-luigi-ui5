sap.ui.define(
  ['luigi/demo/employees/controller/BaseController'],
  function (Controller) {
    'use strict';

    return Controller.extend('luigi.demo.employees.controller.Edit', {
      onInit: function () {
        this.getRouter()
          .getRoute('edit')
          .attachPatternMatched(this._onEditMatched, this);
      },

      _onEditMatched: function (oEvent) {
        var id = oEvent.getParameter('arguments').id;

        var sObjectPath = this.getView().getModel().createKey('/Persons', {
          ID: id
        });

        this.getView().bindElement({
          path: sObjectPath,
          parameters: {
            expand: 'unit'
          }
        });
      },

      handleSavePress: function (oEvent) {
        this.getView().getModel().submitChanges();
        //this._toggleButtonsAndView(false);
        this.getRouter().navTo('employees');
      },

      handleCancelPress: function (oEvent) {
        this.getRouter().navTo('employees');
      }
    });
  }
);
