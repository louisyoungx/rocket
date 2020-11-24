"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CHECKBOX_KEY = void 0;

var _vue = require("vue");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _use = require("@vant/use");

var _useExpose = require("../composables/use-expose");

var _useLinkField = require("../composables/use-link-field");

var _Checker = _interopRequireWildcard(require("./Checker"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _createNamespace = (0, _utils.createNamespace)('checkbox'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var CHECKBOX_KEY = 'vanCheckbox';
exports.CHECKBOX_KEY = CHECKBOX_KEY;

var _default = createComponent({
  props: _objectSpread(_objectSpread({}, _Checker.checkerProps), {}, {
    bindGroup: {
      type: Boolean,
      default: true
    }
  }),
  emits: ['change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var _useParent = (0, _use.useParent)(CHECKBOX_KEY),
        parent = _useParent.parent;

    var setParentValue = function setParentValue(checked) {
      var name = props.name;
      var _parent$props = parent.props,
          max = _parent$props.max,
          modelValue = _parent$props.modelValue;
      var value = modelValue.slice();

      if (checked) {
        var overlimit = max && value.length >= max;

        if (!overlimit && value.indexOf(name) === -1) {
          value.push(name);

          if (props.bindGroup) {
            parent.emit('update:modelValue', value);
          }
        }
      } else {
        var index = value.indexOf(name);

        if (index !== -1) {
          value.splice(index, 1);

          if (props.bindGroup) {
            parent.emit('update:modelValue', value);
          }
        }
      }
    };

    var checked = (0, _vue.computed)(function () {
      if (parent && props.bindGroup) {
        return parent.props.modelValue.indexOf(props.name) !== -1;
      }

      return props.modelValue;
    });

    var toggle = function toggle() {
      var newValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !checked.value;

      if (parent && props.bindGroup) {
        setParentValue(newValue);
      } else {
        emit('update:modelValue', newValue);
      }
    };

    (0, _vue.watch)(function () {
      return props.modelValue;
    }, function (value) {
      emit('change', value);
    });
    (0, _useExpose.useExpose)({
      toggle: toggle,
      props: props,
      checked: checked
    });
    (0, _useLinkField.useLinkField)(function () {
      return props.modelValue;
    });
    return function () {
      return (0, _vue.createVNode)(_Checker.default, (0, _vue.mergeProps)({
        "bem": bem,
        "role": "checkbox",
        "parent": parent,
        "checked": checked.value,
        "bindGroup": props.bindGroup,
        "onToggle": toggle
      }, props), _objectSpread({}, (0, _utils.pick)(slots, ['default', 'icon'])));
    };
  }
});

exports.default = _default;