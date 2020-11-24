"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.cellProps = void 0;

var _vue = require("vue");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _useRoute = require("../composables/use-route");

var _icon = _interopRequireDefault(require("../icon"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _createNamespace = (0, _utils.createNamespace)('cell'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var cellProps = {
  icon: String,
  size: String,
  title: [Number, String],
  value: [Number, String],
  label: [Number, String],
  center: Boolean,
  isLink: Boolean,
  required: Boolean,
  clickable: Boolean,
  iconPrefix: String,
  titleStyle: null,
  titleClass: null,
  valueClass: null,
  labelClass: null,
  arrowDirection: String,
  border: {
    type: Boolean,
    default: true
  }
};
exports.cellProps = cellProps;

var _default = createComponent({
  props: _objectSpread(_objectSpread({}, cellProps), _useRoute.routeProps),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var route = (0, _useRoute.useRoute)();

    var renderLabel = function renderLabel() {
      var showLabel = slots.label || (0, _utils.isDef)(props.label);

      if (showLabel) {
        return (0, _vue.createVNode)("div", {
          "class": [bem('label'), props.labelClass]
        }, [slots.label ? slots.label() : props.label]);
      }
    };

    var renderTitle = function renderTitle() {
      if (slots.title || (0, _utils.isDef)(props.title)) {
        return (0, _vue.createVNode)("div", {
          "class": [bem('title'), props.titleClass],
          "style": props.titleStyle
        }, [slots.title ? slots.title() : (0, _vue.createVNode)("span", null, [props.title]), renderLabel()]);
      }
    };

    var renderValue = function renderValue() {
      var hasTitle = slots.title || (0, _utils.isDef)(props.title);
      var hasValue = slots.default || (0, _utils.isDef)(props.value);

      if (hasValue) {
        return (0, _vue.createVNode)("div", {
          "class": [bem('value', {
            alone: !hasTitle
          }), props.valueClass]
        }, [slots.default ? slots.default() : (0, _vue.createVNode)("span", null, [props.value])]);
      }
    };

    var renderLeftIcon = function renderLeftIcon() {
      if (slots.icon) {
        return slots.icon();
      }

      if (props.icon) {
        return (0, _vue.createVNode)(_icon.default, {
          "name": props.icon,
          "class": bem('left-icon'),
          "classPrefix": props.iconPrefix
        }, null);
      }
    };

    var renderRightIcon = function renderRightIcon() {
      if (slots['right-icon']) {
        return slots['right-icon']();
      }

      if (props.isLink) {
        var name = props.arrowDirection ? "arrow-".concat(props.arrowDirection) : 'arrow';
        return (0, _vue.createVNode)(_icon.default, {
          "name": name,
          "class": bem('right-icon')
        }, null);
      }
    };

    return function () {
      var _slots$extra;

      var size = props.size,
          center = props.center,
          border = props.border,
          isLink = props.isLink,
          required = props.required;
      var clickable = isLink || props.clickable;
      var classes = {
        center: center,
        required: required,
        clickable: clickable,
        borderless: !border
      };

      if (size) {
        classes[size] = !!size;
      }

      return (0, _vue.createVNode)("div", {
        "class": bem(classes),
        "role": clickable ? 'button' : undefined,
        "tabindex": clickable ? 0 : undefined,
        "onClick": route
      }, [renderLeftIcon(), renderTitle(), renderValue(), renderRightIcon(), (_slots$extra = slots.extra) === null || _slots$extra === void 0 ? void 0 : _slots$extra.call(slots)]);
    };
  }
});

exports.default = _default;