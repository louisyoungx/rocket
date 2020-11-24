"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SIDEBAR_KEY = void 0;

var _vue = require("vue");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _use = require("@vant/use");

var _createNamespace = (0, _utils.createNamespace)('sidebar'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var SIDEBAR_KEY = 'vanSidebar';
exports.SIDEBAR_KEY = SIDEBAR_KEY;

var _default = createComponent({
  props: {
    modelValue: {
      type: [Number, String],
      default: 0
    }
  },
  emits: ['change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var _useChildren = (0, _use.useChildren)(SIDEBAR_KEY),
        linkChildren = _useChildren.linkChildren;

    var active = function active() {
      return +props.modelValue;
    };

    var setActive = function setActive(value) {
      if (value !== active()) {
        emit('change', value);
      }
    };

    (0, _vue.watch)(active, setActive);
    linkChildren({
      emit: emit,
      active: active,
      setActive: setActive
    });
    return function () {
      var _slots$default;

      return (0, _vue.createVNode)("div", {
        "class": bem()
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);
    };
  }
});

exports.default = _default;