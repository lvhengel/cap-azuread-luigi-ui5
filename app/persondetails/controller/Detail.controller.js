sap.ui.define(
  [
    'luigi/demo/persondetails/controller/BaseController',
    'sap/ui/core/Fragment',
    'sap/m/MessageBox'
  ],
  function (Controller, Fragment, MessageBox) {
    'use strict';

    return Controller.extend('luigi.demo.persondetails.controller.Detail', {
      onInit: function () {
        this.getRouter()
          .getRoute('detail')
          .attachPatternMatched(this._onDetailMatched, this);

        this._formFragments = {};

        // Set the initial form to be the display one
        this._showFormFragment('Display');
      },

      _onDetailMatched: function (oEvent) {
        var sObjectPath = this.getView().getModel().createKey('/Persons', {
          ID: LuigiClient.getContext().id
        });

        this.getView().bindElement({
          path: sObjectPath,
          parameters: {
            expand: 'unit'
          }
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
        var oModel = this.getView().getModel();
        // Unfortunately the success handler of submitchanges doesn't work since we disabled batch for this ODataModel
        // to catch the success or error status code we added a "requestCompleted" handler

        oModel.attachEventOnce(
          'requestCompleted',
          function (oEvent) {
            var oResponse = oEvent.getParameter('response');

            if (oResponse.statusCode === 403) {
              MessageBox.error(
                JSON.parse(oResponse.responseText).error.message.value
              );
            } else {
              this._toggleButtonsAndView(false);
            }
          }.bind(this)
        );

        this.getView().getModel().submitChanges();
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
