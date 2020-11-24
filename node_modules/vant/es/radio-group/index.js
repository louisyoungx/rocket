import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { watch, createVNode } from "vue";
import { createNamespace } from '../utils';
import { useChildren } from '@vant/use';
import { useLinkField } from '../composables/use-link-field';

var _createNamespace = createNamespace('radio-group'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export var RADIO_KEY = 'vanRadio';
export default createComponent({
  props: {
    disabled: Boolean,
    iconSize: [Number, String],
    direction: String,
    modelValue: null,
    checkedColor: String
  },
  emits: ['change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var _useChildren = useChildren(RADIO_KEY),
        linkChildren = _useChildren.linkChildren;

    watch(function () {
      return props.modelValue;
    }, function (value) {
      emit('change', value);
    });
    linkChildren({
      emit: emit,
      props: props
    });
    useLinkField(function () {
      return props.modelValue;
    });
    return function () {
      var _slots$default;

      return createVNode("div", {
        "class": bem([props.direction]),
        "role": "radiogroup"
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);
    };
  }
});