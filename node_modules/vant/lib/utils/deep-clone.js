"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepClone = deepClone;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _deepAssign = require("./deep-assign");

function deepClone(obj) {
  if (Array.isArray(obj)) {
    return obj.map(function (item) {
      return deepClone(item);
    });
  }

  if ((0, _typeof2.default)(obj) === 'object') {
    return (0, _deepAssign.deepAssign)({}, obj);
  }

  return obj;
}