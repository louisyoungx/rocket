"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePlaceholder = usePlaceholder;

var _vue = require("vue");

var _useHeight = require("./use-height");

function usePlaceholder(contentRef, bem) {
  var height = (0, _useHeight.useHeight)(contentRef);
  return function (renderContent) {
    return (0, _vue.createVNode)("div", {
      "class": bem('placeholder'),
      "style": {
        height: height.value ? "".concat(height.value, "px") : undefined
      }
    }, [renderContent()]);
  };
}