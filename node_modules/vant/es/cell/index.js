import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Utils
import { createNamespace, isDef } from '../utils'; // Composition

import { useRoute, routeProps } from '../composables/use-route'; // Components

import Icon from '../icon';

var _createNamespace = createNamespace('cell'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export var cellProps = {
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
export default createComponent({
  props: _objectSpread(_objectSpread({}, cellProps), routeProps),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var route = useRoute();

    var renderLabel = function renderLabel() {
      var showLabel = slots.label || isDef(props.label);

      if (showLabel) {
        return createVNode("div", {
          "class": [bem('label'), props.labelClass]
        }, [slots.label ? slots.label() : props.label]);
      }
    };

    var renderTitle = function renderTitle() {
      if (slots.title || isDef(props.title)) {
        return createVNode("div", {
          "class": [bem('title'), props.titleClass],
          "style": props.titleStyle
        }, [slots.title ? slots.title() : createVNode("span", null, [props.title]), renderLabel()]);
      }
    };

    var renderValue = function renderValue() {
      var hasTitle = slots.title || isDef(props.title);
      var hasValue = slots.default || isDef(props.value);

      if (hasValue) {
        return createVNode("div", {
          "class": [bem('value', {
            alone: !hasTitle
          }), props.valueClass]
        }, [slots.default ? slots.default() : createVNode("span", null, [props.value])]);
      }
    };

    var renderLeftIcon = function renderLeftIcon() {
      if (slots.icon) {
        return slots.icon();
      }

      if (props.icon) {
        return createVNode(Icon, {
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
        return createVNode(Icon, {
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

      return createVNode("div", {
        "class": bem(classes),
        "role": clickable ? 'button' : undefined,
        "tabindex": clickable ? 0 : undefined,
        "onClick": route
      }, [renderLeftIcon(), renderTitle(), renderValue(), renderRightIcon(), (_slots$extra = slots.extra) === null || _slots$extra === void 0 ? void 0 : _slots$extra.call(slots)]);
    };
  }
});