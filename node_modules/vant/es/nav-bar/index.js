import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { ref, createVNode } from "vue";
// Utils
import { createNamespace } from '../utils';
import { BORDER_BOTTOM } from '../utils/constant'; // Composition

import { usePlaceholder } from '../composables/use-placeholder'; // Components

import Icon from '../icon';

var _createNamespace = createNamespace('nav-bar'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: {
    title: String,
    fixed: Boolean,
    zIndex: [Number, String],
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    placeholder: Boolean,
    safeAreaInsetTop: Boolean,
    border: {
      type: Boolean,
      default: true
    }
  },
  emits: ['click-left', 'click-right'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var navBarRef = ref();
    var renderPlaceholder = usePlaceholder(navBarRef, bem);

    var onClickLeft = function onClickLeft(event) {
      emit('click-left', event);
    };

    var onClickRight = function onClickRight(event) {
      emit('click-right', event);
    };

    var renderLeft = function renderLeft() {
      if (slots.left) {
        return slots.left();
      }

      return [props.leftArrow && createVNode(Icon, {
        "class": bem('arrow'),
        "name": "arrow-left"
      }, null), props.leftText && createVNode("span", {
        "class": bem('text')
      }, [props.leftText])];
    };

    var renderRight = function renderRight() {
      if (slots.right) {
        return slots.right();
      }

      return createVNode("span", {
        "class": bem('text')
      }, [props.rightText]);
    };

    var renderNavBar = function renderNavBar() {
      var title = props.title,
          fixed = props.fixed,
          border = props.border,
          zIndex = props.zIndex;
      var style = {
        zIndex: zIndex !== undefined ? +zIndex : undefined
      };
      var hasLeft = props.leftArrow || props.leftText || slots.left;
      var hasRight = props.rightText || slots.right;
      return createVNode("div", {
        "ref": navBarRef,
        "style": style,
        "class": [bem({
          fixed: fixed,
          'safe-area-inset-top': props.safeAreaInsetTop
        }), _defineProperty({}, BORDER_BOTTOM, border)]
      }, [createVNode("div", {
        "class": bem('content')
      }, [hasLeft && createVNode("div", {
        "class": bem('left'),
        "onClick": onClickLeft
      }, [renderLeft()]), createVNode("div", {
        "class": [bem('title'), 'van-ellipsis']
      }, [slots.title ? slots.title() : title]), hasRight && createVNode("div", {
        "class": bem('right'),
        "onClick": onClickRight
      }, [renderRight()])])]);
    };

    return function () {
      if (props.fixed && props.placeholder) {
        return renderPlaceholder(renderNavBar);
      }

      return renderNavBar();
    };
  }
});