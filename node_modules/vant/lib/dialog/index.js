"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _utils = require("../utils");

var _mountComponent2 = require("../utils/mount-component");

var _Dialog = _interopRequireDefault(require("./Dialog"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var instance;

function initInstance() {
  var Wrapper = {
    setup: function setup() {
      var _usePopupState = (0, _mountComponent2.usePopupState)(),
          state = _usePopupState.state,
          toggle = _usePopupState.toggle;

      return function () {
        return (0, _vue.createVNode)(_Dialog.default, _objectSpread(_objectSpread({}, state), {}, {
          'onUpdate:show': toggle
        }), null);
      };
    }
  };

  var _mountComponent = (0, _mountComponent2.mountComponent)(Wrapper);

  instance = _mountComponent.instance;
}

function Dialog(options) {
  /* istanbul ignore if */
  if (!_utils.inBrowser) {
    return Promise.resolve();
  }

  return new Promise(function (resolve, reject) {
    if (!instance) {
      initInstance();
    }

    instance.open(_objectSpread(_objectSpread(_objectSpread({}, Dialog.currentOptions), options), {}, {
      callback: function callback(action) {
        (action === 'confirm' ? resolve : reject)(action);
      }
    }));
  });
}

Dialog.defaultOptions = {
  title: '',
  width: '',
  theme: null,
  message: '',
  overlay: true,
  callback: null,
  teleport: 'body',
  className: '',
  allowHtml: false,
  lockScroll: true,
  transition: 'van-dialog-bounce',
  beforeClose: null,
  overlayClass: '',
  overlayStyle: null,
  messageAlign: '',
  cancelButtonText: '',
  cancelButtonColor: null,
  confirmButtonText: '',
  confirmButtonColor: null,
  showConfirmButton: true,
  showCancelButton: false,
  closeOnPopstate: true,
  closeOnClickOverlay: false
};
Dialog.alert = Dialog;

Dialog.confirm = function (options) {
  return Dialog(_objectSpread({
    showCancelButton: true
  }, options));
};

Dialog.close = function () {
  if (instance) {
    instance.toggle(false);
  }
};

Dialog.setDefaultOptions = function (options) {
  (0, _extends2.default)(Dialog.currentOptions, options);
};

Dialog.resetDefaultOptions = function () {
  Dialog.currentOptions = _objectSpread({}, Dialog.defaultOptions);
};

Dialog.resetDefaultOptions();

Dialog.install = function (app) {
  app.use(_Dialog.default);
  app.config.globalProperties.$dialog = Dialog;
};

Dialog.Component = _Dialog.default;
var _default = Dialog;
exports.default = _default;