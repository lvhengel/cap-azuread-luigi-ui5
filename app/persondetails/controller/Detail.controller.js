sap.ui.define(
  [
    'luigi/demo/persondetails/controller/BaseController',
    'sap/ui/core/Fragment'
  ],
  function (Controller, Fragment) {
    'use strict';

    return Controller.extend('luigi.demo.persondetails.controller.Detail', {
      onInit: function () {
        this.getRouter()
          .getRoute('detail')
          .attachPatternMatched(this._onDetailMatched, this);
        //debugger;

        this._formFragments = {};

        // Set the initial form to be the display one
        this._showFormFragment('Display');
      },

      _onDetailMatched: function (oEvent) {
        this._sObjectId = '1';

        this.getView().bindElement({
          path: '/Persons(1)',
          parameters: { $$updateGroupId: 'myGroup' }
        });
      },

      handleEditPress: function (oEvent) {
        this._toggleButtonsAndView(true);
      },

      handleCancelPress: function (oEvent) {
        this.getView().getModel().resetChanges('myGroup');
        this._toggleButtonsAndView(false);
      },
      handleSavePress: function (oEvent) {
        this.getView().getModel().submitBatch('myGroup');
        this._toggleButtonsAndView(false);
      },

      _toggleButtonsAndView: function (bEdit) {
        var oAppModel = this.getView().getModel('app');
        oAppModel.setProperty('/editMode', bEdit);

        // Set the right form type
        this._showFormFragment(bEdit ? 'Change' : 'Display');
      },

      _getFormFragment: function (sFragmentName) {
        var pFormFragment = this._formFragments[sFragmentName],
          oView = this.getView();

        if (!pFormFragment) {
          pFormFragment = Fragment.load({
            id: oView.getId(),
            name: 'luigi.demo.persondetails.view.fragments.' + sFragmentName
          });
          this._formFragments[sFragmentName] = pFormFragment;
        }

        return pFormFragment;
      },

      _showFormFragment: function (sFragmentName) {
        var oPage = this.byId('pageDetail');

        oPage.removeAllContent();
        this._getFormFragment(sFragmentName).then(function (oVBox) {
          oPage.insertContent(oVBox);
        });
      }
    });
  }
);
