import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { computed, createVNode } from "vue";
import { createNamespace } from '../utils';
import { useParent } from '@vant/use';
import { ROW_KEY } from '../row';

var _createNamespace = createNamespace('col'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: {
    offset: [Number, String],
    tag: {
      type: String,
      default: 'div'
    },
    span: {
      type: [Number, String],
      default: 0
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useParent = useParent(ROW_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var style = computed(function () {
      if (!parent) {
        return;
      }

      var spaces = parent.spaces;

      if (spaces && spaces.value && spaces.value[index.value]) {
        var _spaces$value$value = spaces.value[index.value],
            left = _spaces$value$value.left,
            right = _spaces$value$value.right;
        return {
          paddingLeft: left ? "".concat(left, "px") : null,
          paddingRight: right ? "".concat(right, "px") : null
        };
      }
    });
    return function () {
      var _bem, _slots$default;

      var tag = props.tag,
          span = props.span,
          offset = props.offset;
      return createVNode(tag, {
        "style": style.value,
        "class": bem((_bem = {}, _defineProperty(_bem, span, span), _defineProperty(_bem, "offset-".concat(offset), offset), _bem))
      }, {
        default: function _default() {
          return [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)];
        }
      });
    };
  }
});