"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDate = isDate;

var _number = require("./number");

function isDate(val) {
  return Object.prototype.toString.call(val) === '[object Date]' && !(0, _number.isNaN)(val.getTime());
}