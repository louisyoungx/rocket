"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createComponent = createComponent;

var _vue = require("vue");

var _string = require("../format/string");

/**
 * Create a basic component with common options
 */
function createComponent(name) {
  return function (sfc) {
    sfc.name = name;

    sfc.install = function (app) {
      app.component(name, sfc);
      app.component((0, _string.camelize)("-".concat(name)), sfc);
    };

    return (0, _vue.defineComponent)(sfc);
  };
}