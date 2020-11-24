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

var _useExpose = require("../composables/use-expose");

var _field = _interopRequireDefault(require("../field"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _createNamespace = (0, _utils.createNamespace)('search'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 3),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1],
    t = _createNamespace2[2];

var _default = createComponent({
  inheritAttrs: false,
  props: {
    label: String,
    rightIcon: String,
    modelValue: String,
    actionText: String,
    background: String,
    showAction: Boolean,
    clearTrigger: String,
    shape: {
      type: String,
      default: 'square'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    leftIcon: {
      type: String,
      default: 'search'
    }
  },
  emits: ['search', 'cancel'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots,
        attrs = _ref.attrs;
    var filedRef = (0, _vue.ref)();

    var onCancel = function onCancel() {
      if (!slots.action) {
        emit('update:modelValue', '');
        emit('cancel');
      }
    };

    var onKeypress = function onKeypress(event) {
      var ENTER_CODE = 13;

      if (event.keyCode === ENTER_CODE) {
        (0, _utils.preventDefault)(event);
        emit('search', props.modelValue);
      }
    };

    var renderLabel = function renderLabel() {
      if (slots.label || props.label) {
        return (0, _vue.createVNode)("div", {
          "class": bem('label')
        }, [slots.label ? slots.label() : props.label]);
      }
    };

    var renderAction = function renderAction() {
      if (props.showAction) {
        var text = props.actionText || t('cancel');
        return (0, _vue.createVNode)("div", {
          "class": bem('action'),
          "role": "button",
          "tabindex": "0",
          "onClick": onCancel
        }, [slots.action ? slots.action() : text]);
      }
    };

    var focus = function focus() {
      if (filedRef.value) {
        filedRef.value.focus();
      }
    };

    var blur = function blur() {
      if (filedRef.value) {
        filedRef.value.blur();
      }
    };

    var fieldPropNames = ['leftIcon', 'rightIcon', 'clearable', 'modelValue', 'clearTrigger'];

    var renderField = function renderField() {
      var fieldAttrs = _objectSpread(_objectSpread(_objectSpread({}, attrs), (0, _utils.pick)(props, fieldPropNames)), {}, {
        style: null,
        class: null
      });

      return (0, _vue.createVNode)(_field.default, (0, _vue.mergeProps)({
        "ref": filedRef,
        "type": "search",
        "border": false,
        "onKeypress": onKeypress
      }, fieldAttrs), _objectSpread({}, (0, _utils.pick)(slots, ['left-icon', 'right-icon'])));
    };

    (0, _useExpose.useExpose)({
      focus: focus,
      blur: blur
    });
    return function () {
      var _slots$left;

      return (0, _vue.createVNode)("div", {
        "class": [bem({
          'show-action': props.showAction
        }), attrs.class],
        "style": _objectSpread({
          background: props.background
        }, attrs.style)
      }, [(_slots$left = slots.left) === null || _slots$left === void 0 ? void 0 : _slots$left.call(slots), (0, _vue.createVNode)("div", {
        "class": bem('content', props.shape)
      }, [renderLabel(), renderField()]), renderAction()]);
    };
  }
});

exports.default = _default;