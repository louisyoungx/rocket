import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { Transition, createVNode } from "vue";
import { createNamespace } from '../utils';
import Icon from '../icon';

var _createNamespace = createNamespace('tag'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: {
    size: String,
    mark: Boolean,
    color: String,
    plain: Boolean,
    round: Boolean,
    textColor: String,
    closeable: Boolean,
    type: {
      type: String,
      default: 'default'
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  emits: ['close'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;

    var onClose = function onClose(event) {
      event.stopPropagation();
      emit('close');
    };

    var getStyle = function getStyle() {
      if (props.plain) {
        return {
          color: props.textColor || props.color
        };
      }

      return {
        color: props.textColor,
        background: props.color
      };
    };

    return function () {
      var _slots$default;

      var show = props.show,
          type = props.type,
          mark = props.mark,
          plain = props.plain,
          round = props.round,
          size = props.size,
          closeable = props.closeable;
      var classes = {
        mark: mark,
        plain: plain,
        round: round
      };

      if (size) {
        classes[size] = size;
      }

      var CloseIcon = closeable && createVNode(Icon, {
        "name": "cross",
        "class": bem('close'),
        "onClick": onClose
      }, null);
      return createVNode(Transition, {
        "name": closeable ? 'van-fade' : undefined
      }, {
        default: function _default() {
          return [show ? createVNode("span", {
            "style": getStyle(),
            "class": bem([classes, type])
          }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots), CloseIcon]) : null];
        }
      });
    };
  }
});