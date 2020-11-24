import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { mergeProps, createVNode, Fragment } from "vue";
import { createNamespace } from '../utils';
import { BORDER_TOP_BOTTOM } from '../utils/constant';

var _createNamespace = createNamespace('cell-group'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  inheritAttrs: false,
  props: {
    title: String,
    border: {
      type: Boolean,
      default: true
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;
    return function () {
      var _slots$default;

      var title = props.title,
          border = props.border;
      var Group = createVNode("div", mergeProps({
        "class": [bem(), _defineProperty({}, BORDER_TOP_BOTTOM, border)]
      }, attrs), [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);

      if (title || slots.title) {
        return createVNode(Fragment, null, [createVNode("div", {
          "class": bem('title')
        }, [slots.title ? slots.title() : title]), Group]);
      }

      return Group;
    };
  }
});