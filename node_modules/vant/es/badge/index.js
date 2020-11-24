import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createVNode } from "vue";
import { isDef, createNamespace } from '../utils';
import { isNumeric } from '../utils/validate/number';

var _createNamespace = createNamespace('badge'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: {
    dot: Boolean,
    max: [Number, String],
    color: String,
    content: [Number, String],
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var hasContent = function hasContent() {
      return !!(slots.content || isDef(props.content) && props.content !== '');
    };

    var renderContent = function renderContent() {
      var dot = props.dot,
          max = props.max,
          content = props.content;

      if (!dot && hasContent()) {
        if (slots.content) {
          return slots.content();
        }

        if (isDef(max) && isNumeric(content) && +content > max) {
          return "".concat(max, "+");
        }

        return content;
      }
    };

    var renderBadge = function renderBadge() {
      if (hasContent() || props.dot) {
        return createVNode("div", {
          "class": bem({
            dot: props.dot,
            fixed: !!slots.default
          }),
          "style": {
            background: props.color
          }
        }, [renderContent()]);
      }
    };

    return function () {
      if (slots.default) {
        var tag = props.tag;
        return createVNode(tag, {
          "class": bem('wrapper')
        }, {
          default: function _default() {
            return [slots.default(), renderBadge()];
          }
        });
      }

      return renderBadge();
    };
  }
});