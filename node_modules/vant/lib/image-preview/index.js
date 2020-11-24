"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _utils = require("../utils");

var _mountComponent2 = require("../utils/mount-component");

var _ImagePreview = _interopRequireDefault(require("./ImagePreview"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var instance;
var defaultConfig = {
  loop: true,
  images: [],
  maxZoom: 3,
  minZoom: 1 / 3,
  onScale: null,
  onClose: null,
  onChange: null,
  teleport: 'body',
  className: '',
  showIndex: true,
  closeable: false,
  closeIcon: 'clear',
  beforeClose: null,
  startPosition: 0,
  swipeDuration: 500,
  showIndicators: false,
  closeOnPopstate: true,
  closeIconPosition: 'top-right'
};

function initInstance() {
  var _mountComponent = (0, _mountComponent2.mountComponent)({
    setup: function setup() {
      var _usePopupState = (0, _mountComponent2.usePopupState)(),
          state = _usePopupState.state,
          toggle = _usePopupState.toggle;

      var onClosed = function onClosed() {
        state.images = [];
      };

      return function () {
        return (0, _vue.createVNode)(_ImagePreview.default, _objectSpread(_objectSpread({}, state), {}, {
          onClosed: onClosed,
          'onUpdate:show': toggle
        }), null);
      };
    }
  });

  instance = _mountComponent.instance;
}

var ImagePreview = function ImagePreview(images) {
  var startPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  /* istanbul ignore if */
  if (!_utils.inBrowser) {
    return;
  }

  if (!instance) {
    initInstance();
  }

  var options = Array.isArray(images) ? {
    images: images,
    startPosition: startPosition
  } : images;
  instance.open(_objectSpread(_objectSpread({}, defaultConfig), options));
  return instance;
};

ImagePreview.Component = _ImagePreview.default;

ImagePreview.install = function (app) {
  app.use(_ImagePreview.default);
};

var _default = ImagePreview;
exports.default = _default;