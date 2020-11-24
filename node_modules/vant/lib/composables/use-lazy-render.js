"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLazyRender = useLazyRender;

var _vue = require("vue");

function useLazyRender(show) {
  var inited = (0, _vue.ref)(false);
  (0, _vue.watch)(show, function (value) {
    if (value) {
      inited.value = value;
    }
  }, {
    immediate: true
  });
  return function (render) {
    return function () {
      return inited.value ? render() : null;
    };
  };
}