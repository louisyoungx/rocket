"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ACTION_BAR_KEY = void 0;

var _vue = require("vue");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _use = require("@vant/use");

var _createNamespace = (0, _utils.createNamespace)('action-bar'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var ACTION_BAR_KEY = 'vanActionBar';
exports.ACTION_BAR_KEY = ACTION_BAR_KEY;

var _default = createComponent({
  props: {
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useChildren = (0, _use.useChildren)(ACTION_BAR_KEY),
        linkChildren = _useChildren.linkChildren;

    linkChildren();
    return function () {
      var _slots$default;

      return (0, _vue.createVNode)("div", {
        "class": bem({
          unfit: !props.safeAreaInsetBottom
        })
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);
    };
  }
});

exports.default = _default;