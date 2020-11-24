"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _checkbox = require("../checkbox");

var _use = require("@vant/use");

var _useExpose = require("../composables/use-expose");

var _useLinkField = require("../composables/use-link-field");

var _createNamespace = (0, _utils.createNamespace)('checkbox-group'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default2 = createComponent({
  props: {
    max: [Number, String],
    disabled: Boolean,
    direction: String,
    iconSize: [Number, String],
    checkedColor: String,
    modelValue: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  emits: ['change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var _useChildren = (0, _use.useChildren)(_checkbox.CHECKBOX_KEY),
        children = _useChildren.children,
        linkChildren = _useChildren.linkChildren;

    var toggleAll = function toggleAll(checked) {
      if (checked === false) {
        emit('update:modelValue', []);
      } else {
        var names = children.filter(function (item) {
          var willCheck = checked || !item.checked.value;
          return item.props.bindGroup && willCheck;
        }).map(function (item) {
          return item.name;
        });
        emit('update:modelValue', names);
      }
    };

    (0, _vue.watch)(function () {
      return props.modelValue;
    }, function (value) {
      emit('change', value);
    });
    (0, _useExpose.useExpose)({
      toggleAll: toggleAll
    });
    (0, _useLinkField.useLinkField)(function () {
      return props.modelValue;
    });
    linkChildren({
      emit: emit,
      props: props
    });
    return function () {
      var _slots$default;

      return (0, _vue.createVNode)("div", {
        "class": bem([props.direction])
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);
    };
  }
});

exports.default = _default2;