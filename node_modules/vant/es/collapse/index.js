import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createVNode } from "vue";
import { createNamespace } from '../utils';
import { BORDER_TOP_BOTTOM } from '../utils/constant';
import { useChildren } from '@vant/use';

var _createNamespace = createNamespace('collapse'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export var COLLAPSE_KEY = 'vanCollapse';
export default createComponent({
  props: {
    accordion: Boolean,
    modelValue: [String, Number, Array],
    border: {
      type: Boolean,
      default: true
    }
  },
  emits: ['change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var _useChildren = useChildren(COLLAPSE_KEY),
        linkChildren = _useChildren.linkChildren;

    var toggle = function toggle(name, expanded) {
      var accordion = props.accordion,
          modelValue = props.modelValue;

      if (accordion) {
        if (name === modelValue) {
          name = '';
        }
      } else if (expanded) {
        name = modelValue.concat(name);
      } else {
        name = modelValue.filter(function (activeName) {
          return activeName !== name;
        });
      }

      emit('change', name);
      emit('update:modelValue', name);
    };

    var isExpanded = function isExpanded(name) {
      var accordion = props.accordion,
          modelValue = props.modelValue;

      if (!accordion && !Array.isArray(modelValue) && process.env.NODE_ENV !== 'production') {
        console.error('[Vant] Collapse: type of prop "modelValue" should be Array');
        return;
      }

      return accordion ? modelValue === name : modelValue.indexOf(name) !== -1;
    };

    linkChildren({
      toggle: toggle,
      isExpanded: isExpanded
    });
    return function () {
      var _slots$default;

      return createVNode("div", {
        "class": [bem(), _defineProperty({}, BORDER_TOP_BOTTOM, props.border)]
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);
    };
  }
});