import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createVNode } from "vue";
import { createNamespace, addUnit } from '../utils';
import { BORDER_TOP } from '../utils/constant';
import { useChildren } from '@vant/use';

var _createNamespace = createNamespace('grid'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export var GRID_KEY = 'vanGrid';
export default createComponent({
  props: {
    square: Boolean,
    gutter: [Number, String],
    iconSize: [Number, String],
    direction: String,
    clickable: Boolean,
    columnNum: {
      type: [Number, String],
      default: 4
    },
    center: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useChildren = useChildren(GRID_KEY),
        linkChildren = _useChildren.linkChildren;

    linkChildren({
      props: props
    });
    return function () {
      var _slots$default;

      return createVNode("div", {
        "style": {
          paddingLeft: addUnit(props.gutter)
        },
        "class": [bem(), _defineProperty({}, BORDER_TOP, props.border && !props.gutter)]
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);
    };
  }
});