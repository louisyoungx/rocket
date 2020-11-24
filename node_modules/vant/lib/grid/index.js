"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.GRID_KEY = void 0;

var _vue = require("vue");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _constant = require("../utils/constant");

var _use = require("@vant/use");

var _createNamespace = (0, _utils.createNamespace)('grid'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var GRID_KEY = 'vanGrid';
exports.GRID_KEY = GRID_KEY;

var _default = createComponent({
  props: {
    square: Boolean,
    gutter: [Number, String],
    iconSize: [Number, String],
    direction: String,
    clickable: Boolean,
    columnNum: {
      type: [Number, String],
      default: 4
    },
    center: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useChildren = (0, _use.useChildren)(GRID_KEY),
        linkChildren = _useChildren.linkChildren;

    linkChildren({
      props: props
    });
    return function () {
      var _slots$default;

      return (0, _vue.createVNode)("div", {
        "style": {
          paddingLeft: (0, _utils.addUnit)(props.gutter)
        },
        "class": [bem(), (0, _defineProperty2.default)({}, _constant.BORDER_TOP, props.border && !props.gutter)]
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);
    };
  }
});

exports.default = _default;