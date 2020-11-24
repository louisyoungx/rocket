import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createVNode } from "vue";
import { addUnit, createNamespace } from '../utils';
import Badge from '../badge';

var _createNamespace = createNamespace('icon'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

function isImage(name) {
  return name ? name.indexOf('/') !== -1 : false;
}

export default createComponent({
  props: {
    dot: Boolean,
    name: String,
    size: [Number, String],
    badge: [Number, String],
    color: String,
    tag: {
      type: String,
      default: 'i'
    },
    classPrefix: {
      type: String,
      default: bem()
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var _slots$default;

      var tag = props.tag,
          dot = props.dot,
          name = props.name,
          size = props.size,
          badge = props.badge,
          color = props.color,
          classPrefix = props.classPrefix;
      var isImageIcon = isImage(name);
      return createVNode(Badge, {
        "dot": dot,
        "tag": tag,
        "content": badge,
        "class": [classPrefix, isImageIcon ? '' : "".concat(classPrefix, "-").concat(name)],
        "style": {
          color: color,
          fontSize: addUnit(size)
        }
      }, {
        default: function _default() {
          return [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots), isImageIcon && createVNode("img", {
            "class": bem('image'),
            "src": name
          }, null)];
        }
      });
    };
  }
});