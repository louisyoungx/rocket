import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Utils
import { createNamespace } from '../utils';
import { BORDER_SURROUND, WHITE } from '../utils/constant';
import { useRoute, routeProps } from '../composables/use-route'; // Components

import Icon from '../icon';
import Loading from '../loading';

var _createNamespace = createNamespace('button'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: _objectSpread(_objectSpread({}, routeProps), {}, {
    text: String,
    icon: String,
    color: String,
    block: Boolean,
    plain: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    iconPrefix: String,
    loadingText: String,
    loadingType: String,
    tag: {
      type: String,
      default: 'button'
    },
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'normal'
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loadingSize: {
      type: String,
      default: '20px'
    },
    iconPosition: {
      type: String,
      default: 'left'
    }
  }),
  emits: ['click'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var route = useRoute();

    var renderLoadingIcon = function renderLoadingIcon() {
      if (slots.loading) {
        return slots.loading();
      }

      return createVNode(Loading, {
        "class": bem('loading'),
        "size": props.loadingSize,
        "type": props.loadingType,
        "color": "currentColor"
      }, null);
    };

    var renderIcon = function renderIcon() {
      if (props.loading) {
        return renderLoadingIcon();
      }

      if (props.icon) {
        return createVNode(Icon, {
          "name": props.icon,
          "class": bem('icon'),
          "classPrefix": props.iconPrefix
        }, null);
      }
    };

    var renderText = function renderText() {
      var text;

      if (props.loading) {
        text = props.loadingText;
      } else {
        text = slots.default ? slots.default() : props.text;
      }

      if (text) {
        return createVNode("span", {
          "class": bem('text')
        }, [text]);
      }
    };

    var getStyle = function getStyle() {
      var color = props.color,
          plain = props.plain;

      if (color) {
        var style = {};
        style.color = plain ? color : WHITE;

        if (!plain) {
          // Use background instead of backgroundColor to make linear-gradient work
          style.background = color;
        } // hide border when color is linear-gradient


        if (color.indexOf('gradient') !== -1) {
          style.border = 0;
        } else {
          style.borderColor = color;
        }

        return style;
      }
    };

    var onClick = function onClick(event) {
      if (!props.loading && !props.disabled) {
        emit('click', event);
        route();
      }
    };

    return function () {
      var tag = props.tag,
          type = props.type,
          size = props.size,
          block = props.block,
          round = props.round,
          plain = props.plain,
          square = props.square,
          loading = props.loading,
          disabled = props.disabled,
          hairline = props.hairline,
          nativeType = props.nativeType,
          iconPosition = props.iconPosition;
      var classes = [bem([type, size, {
        plain: plain,
        block: block,
        round: round,
        square: square,
        loading: loading,
        disabled: disabled,
        hairline: hairline
      }]), _defineProperty({}, BORDER_SURROUND, hairline)];
      return createVNode(tag, {
        "type": nativeType,
        "class": classes,
        "style": getStyle(),
        "disabled": disabled,
        "onClick": onClick
      }, {
        default: function _default() {
          return [createVNode("div", {
            "class": bem('content')
          }, [iconPosition === 'left' && renderIcon(), renderText(), iconPosition === 'right' && renderIcon()])];
        }
      });
    };
  }
});