import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createVNode } from "vue";
import { createNamespace } from '../utils';
import { useChildren } from '@vant/use';

var _createNamespace = createNamespace('action-bar'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export var ACTION_BAR_KEY = 'vanActionBar';
export default createComponent({
  props: {
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useChildren = useChildren(ACTION_BAR_KEY),
        linkChildren = _useChildren.linkChildren;

    linkChildren();
    return function () {
      var _slots$default;

      return createVNode("div", {
        "class": bem({
          unfit: !props.safeAreaInsetBottom
        })
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);
    };
  }
});