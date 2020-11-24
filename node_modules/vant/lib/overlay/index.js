"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _useLazyRender = require("../composables/use-lazy-render");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _createNamespace = (0, _utils.createNamespace)('overlay'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default2 = createComponent({
  props: {
    show: Boolean,
    zIndex: [Number, String],
    duration: [Number, String],
    className: null,
    customStyle: Object,
    lockScroll: {
      type: Boolean,
      default: true
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var lazyRender = (0, _useLazyRender.useLazyRender)(function () {
      return props.show;
    });

    var preventTouchMove = function preventTouchMove(event) {
      (0, _utils.preventDefault)(event, true);
    };

    var renderOverlay = lazyRender(function () {
      var _slots$default;

      var style = _objectSpread({
        zIndex: props.zIndex !== undefined ? +props.zIndex : undefined
      }, props.customStyle);

      if ((0, _utils.isDef)(props.duration)) {
        style.animationDuration = "".concat(props.duration, "s");
      }

      return (0, _vue.withDirectives)((0, _vue.createVNode)("div", {
        "style": style,
        "class": [bem(), props.className],
        "onTouchmove": props.lockScroll ? preventTouchMove : _utils.noop
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]), [[_vue.vShow, props.show]]);
    });
    return function () {
      return (0, _vue.createVNode)(_vue.Transition, {
        "name": "van-fade"
      }, {
        default: function _default() {
          return [renderOverlay()];
        }
      });
    };
  }
});

exports.default = _default2;