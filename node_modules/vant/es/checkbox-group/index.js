import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { watch, createVNode } from "vue";
import { createNamespace } from '../utils';
import { CHECKBOX_KEY } from '../checkbox';
import { useChildren } from '@vant/use';
import { useExpose } from '../composables/use-expose';
import { useLinkField } from '../composables/use-link-field';

var _createNamespace = createNamespace('checkbox-group'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
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

    var _useChildren = useChildren(CHECKBOX_KEY),
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

    watch(function () {
      return props.modelValue;
    }, function (value) {
      emit('change', value);
    });
    useExpose({
      toggleAll: toggleAll
    });
    useLinkField(function () {
      return props.modelValue;
    });
    linkChildren({
      emit: emit,
      props: props
    });
    return function () {
      var _slots$default;

      return createVNode("div", {
        "class": bem([props.direction])
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);
    };
  }
});