"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _vue = require("vue");

var _deepAssign = require("../utils/deep-assign");

var _zhCN = _interopRequireDefault(require("./lang/zh-CN"));

var lang = (0, _vue.ref)('zh-CN');

var _messages = (0, _vue.reactive)({
  'zh-CN': _zhCN.default
});

var _default = {
  messages: function messages() {
    return _messages[lang.value];
  },
  use: function use(newLang, newMessages) {
    lang.value = newLang;
    this.add((0, _defineProperty2.default)({}, newLang, newMessages));
  },
  add: function add() {
    var newMessages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _deepAssign.deepAssign)(_messages, newMessages);
  }
};
exports.default = _default;