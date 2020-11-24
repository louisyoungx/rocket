import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createVNode } from "vue";
import { createNamespace, addUnit } from '../utils';
import { BORDER_LEFT, BORDER_SURROUND } from '../utils/constant';

var _createNamespace = createNamespace('password-input'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: {
    info: String,
    gutter: [Number, String],
    focused: Boolean,
    errorInfo: String,
    mask: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ''
    },
    length: {
      type: [Number, String],
      default: 6
    }
  },
  emits: ['focus'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var onTouchStart = function onTouchStart(event) {
      event.stopPropagation();
      emit('focus', event);
    };

    var renderPoints = function renderPoints() {
      var Points = [];
      var mask = props.mask,
          value = props.value,
          length = props.length,
          gutter = props.gutter,
          focused = props.focused;

      for (var i = 0; i < length; i++) {
        var _char = value[i];
        var showBorder = i !== 0 && !gutter;
        var showCursor = focused && i === value.length;
        var style = void 0;

        if (i !== 0 && gutter) {
          style = {
            marginLeft: addUnit(gutter)
          };
        }

        Points.push(createVNode("li", {
          "class": [_defineProperty({}, BORDER_LEFT, showBorder), bem('item', {
            focus: showCursor
          })],
          "style": style
        }, [mask ? createVNode("i", {
          "style": {
            visibility: _char ? 'visible' : 'hidden'
          }
        }, null) : _char, showCursor && createVNode("div", {
          "class": bem('cursor')
        }, null)]));
      }

      return Points;
    };

    return function () {
      var info = props.errorInfo || props.info;
      return createVNode("div", {
        "class": bem()
      }, [createVNode("ul", {
        "class": [bem('security'), _defineProperty({}, BORDER_SURROUND, !props.gutter)],
        "onTouchstart": onTouchStart
      }, [renderPoints()]), info && createVNode("div", {
        "class": bem(props.errorInfo ? 'error-info' : 'info')
      }, [info])]);
    };
  }
});