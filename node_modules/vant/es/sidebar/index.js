import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { watch, createVNode } from "vue";
import { createNamespace } from '../utils';
import { useChildren } from '@vant/use';

var _createNamespace = createNamespace('sidebar'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export var SIDEBAR_KEY = 'vanSidebar';
export default createComponent({
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

    var _useChildren = useChildren(SIDEBAR_KEY),
        linkChildren = _useChildren.linkChildren;

    var active = function active() {
      return +props.modelValue;
    };

    var setActive = function setActive(value) {
      if (value !== active()) {
        emit('change', value);
      }
    };

    watch(active, setActive);
    linkChildren({
      emit: emit,
      active: active,
      setActive: setActive
    });
    return function () {
      var _slots$default;

      return createVNode("div", {
        "class": bem()
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);
    };
  }
});