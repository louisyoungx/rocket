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

var _Notify = _interopRequireDefault(require("./Notify"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var timer;
var instance;

function parseOptions(message) {
  return (0, _utils.isObject)(message) ? message : {
    message: message
  };
}

function initInstance() {
  var _mountComponent = (0, _mountComponent2.mountComponent)({
    setup: function setup() {
      var _usePopupState = (0, _mountComponent2.usePopupState)(),
          state = _usePopupState.state,
          toggle = _usePopupState.toggle;

      return function () {
        return (0, _vue.createVNode)(_Notify.default, _objectSpread(_objectSpread({}, state), {}, {
          'onUpdate:show': toggle
        }), null);
      };
    }
  });

  instance = _mountComponent.instance;
}

function Notify(options) {
  if (!_utils.inBrowser) {
    return;
  }

  if (!instance) {
    initInstance();
  }

  options = _objectSpread(_objectSpread({}, Notify.currentOptions), parseOptions(options));
  instance.open(options);
  clearTimeout(timer);

  if (options.duration > 0) {
    timer = setTimeout(Notify.clear, options.duration);
  }

  return instance;
}

function defaultOptions() {
  return {
    type: 'danger',
    message: '',
    color: undefined,
    background: undefined,
    duration: 3000,
    className: '',
    onClose: null,
    onClick: null,
    onOpened: null
  };
}

Notify.clear = function () {
  if (instance) {
    instance.toggle(false);
  }
};

Notify.currentOptions = defaultOptions();

Notify.setDefaultOptions = function (options) {
  (0, _extends2.default)(Notify.currentOptions, options);
};

Notify.resetDefaultOptions = function () {
  Notify.currentOptions = defaultOptions();
};

Notify.install = function (app) {
  app.use(_Notify.default);
  app.config.globalProperties.$notify = Notify;
};

Notify.Component = _Notify.default;
var _default = Notify;
exports.default = _default;