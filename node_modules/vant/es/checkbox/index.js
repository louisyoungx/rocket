import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { computed, watch, resolveDirective, mergeProps, createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { createNamespace, pick } from '../utils';
import { useParent } from '@vant/use';
import { useExpose } from '../composables/use-expose';
import { useLinkField } from '../composables/use-link-field';
import Checker, { checkerProps } from './Checker';

var _createNamespace = createNamespace('checkbox'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export var CHECKBOX_KEY = 'vanCheckbox';
export default createComponent({
  props: _objectSpread(_objectSpread({}, checkerProps), {}, {
    bindGroup: {
      type: Boolean,
      default: true
    }
  }),
  emits: ['change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var _useParent = useParent(CHECKBOX_KEY),
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

    var checked = computed(function () {
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

    watch(function () {
      return props.modelValue;
    }, function (value) {
      emit('change', value);
    });
    useExpose({
      toggle: toggle,
      props: props,
      checked: checked
    });
    useLinkField(function () {
      return props.modelValue;
    });
    return function () {
      return createVNode(Checker, mergeProps({
        "bem": bem,
        "role": "checkbox",
        "parent": parent,
        "checked": checked.value,
        "bindGroup": props.bindGroup,
        "onToggle": toggle
      }, props), _objectSpread({}, pick(slots, ['default', 'icon'])));
    };
  }
});