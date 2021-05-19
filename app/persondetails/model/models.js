sap.ui.define(
  ['sap/ui/model/json/JSONModel', 'sap/ui/Device'],
  function (JSONModel, Device) {
    'use strict';

    return {
      createDeviceModel: function () {
        var oModel = new JSONModel(Device);
        oModel.setDefaultBindingMode('OneWay');
        return oModel;
      },

      createAppModel: function () {
        var oModel = new JSONModel({
          editMode: false,
          edit: true,
          save: false,
          cancel: false
        });
        oModel.setDefaultBindingMode('OneWay');
        return oModel;
      }
    };
  }
);
