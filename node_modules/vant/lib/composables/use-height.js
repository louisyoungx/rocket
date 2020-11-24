"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHeight = void 0;

var _use = require("@vant/use");

var _vue = require("vue");

var useHeight = function useHeight(element) {
  var height = (0, _vue.ref)();
  (0, _vue.onMounted)(function () {
    (0, _vue.nextTick)(function () {
      height.value = (0, _use.useRect)(element).height;
    });
  });
  return height;
};

exports.useHeight = useHeight;