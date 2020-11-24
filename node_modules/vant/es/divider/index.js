import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createVNode } from "vue";
import { createNamespace } from '../utils';

var _createNamespace = createNamespace('divider'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: {
    dashed: Boolean,
    hairline: {
      type: Boolean,
      default: true
    },
    contentPosition: {
      type: String,
      default: 'center'
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var _slots$default;

      return createVNode("div", {
        "role": "separator",
        "class": bem(_defineProperty({
          dashed: props.dashed,
          hairline: props.hairline
        }, "content-".concat(props.contentPosition), !!slots.default))
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);
    };
  }
});