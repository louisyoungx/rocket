"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLinkField = useLinkField;

var _vue = require("vue");

var _field = require("../field");

function useLinkField(getValue) {
  var field = (0, _vue.inject)(_field.FIELD_KEY, null);

  if (field && !field.childFieldValue.value) {
    field.childFieldValue.value = getValue;
    (0, _vue.watch)(getValue, function () {
      field.resetValidation();
      field.validateWithTrigger('onChange');
    });
  }
}