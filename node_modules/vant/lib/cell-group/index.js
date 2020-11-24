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

var _constant = require("../utils/constant");

var _createNamespace = (0, _utils.createNamespace)('cell-group'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default = createComponent({
  inheritAttrs: false,
  props: {
    title: String,
    border: {
      type: Boolean,
      default: true
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;
    return function () {
      var _slots$default;

      var title = props.title,
          border = props.border;
      var Group = (0, _vue.createVNode)("div", (0, _vue.mergeProps)({
        "class": [bem(), (0, _defineProperty2.default)({}, _constant.BORDER_TOP_BOTTOM, border)]
      }, attrs), [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);

      if (title || slots.title) {
        return (0, _vue.createVNode)(_vue.Fragment, null, [(0, _vue.createVNode)("div", {
          "class": bem('title')
        }, [slots.title ? slots.title() : title]), Group]);
      }

      return Group;
    };
  }
});

exports.default = _default;