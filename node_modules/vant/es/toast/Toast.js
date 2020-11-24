import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { watch, onMounted, onUnmounted, createVNode } from "vue";
// Utils
import { createNamespace, isDef } from '../utils';
import { lockClick } from './lock-click'; // Components

import Icon from '../icon';
import Popup from '../popup';
import Loading from '../loading';

var _createNamespace = createNamespace('toast'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: {
    icon: String,
    show: Boolean,
    message: [Number, String],
    duration: Number,
    className: null,
    iconPrefix: String,
    lockScroll: Boolean,
    loadingType: String,
    forbidClick: Boolean,
    closeOnClick: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    position: {
      type: String,
      default: 'middle'
    },
    transition: {
      type: String,
      default: 'van-fade'
    }
  },
  emits: ['update:show'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var timer;
    var clickable = false;

    var toggleClickable = function toggleClickable() {
      var newValue = props.show && props.forbidClick;

      if (clickable !== newValue) {
        clickable = newValue;
        lockClick(clickable);
      }
    };

    var onClick = function onClick() {
      if (props.closeOnClick) {
        emit('update:show', false);
      }
    };

    var clearTimer = function clearTimer() {
      clearTimeout(timer);
    };

    var renderIcon = function renderIcon() {
      var icon = props.icon,
          type = props.type,
          iconPrefix = props.iconPrefix,
          loadingType = props.loadingType;
      var hasIcon = icon || type === 'success' || type === 'fail';

      if (hasIcon) {
        return createVNode(Icon, {
          "name": icon || type,
          "class": bem('icon'),
          "classPrefix": iconPrefix
        }, null);
      }

      if (type === 'loading') {
        return createVNode(Loading, {
          "class": bem('loading'),
          "type": loadingType
        }, null);
      }
    };

    var renderMessage = function renderMessage() {
      var type = props.type,
          message = props.message;

      if (isDef(message) && message !== '') {
        return type === 'html' ? createVNode("div", {
          "class": bem('text'),
          "innerHTML": message
        }, null) : createVNode("div", {
          "class": bem('text')
        }, [message]);
      }
    };

    watch([function () {
      return props.show;
    }, function () {
      return props.forbidClick;
    }], toggleClickable);
    watch([function () {
      return props.show;
    }, function () {
      return props.duration;
    }], function () {
      clearTimer();

      if (props.show && props.duration > 0) {
        timer = setTimeout(function () {
          emit('update:show', false);
        }, props.duration);
      }
    });
    onMounted(toggleClickable);
    onUnmounted(toggleClickable);
    return function () {
      return createVNode(Popup, {
        "show": props.show,
        "class": [bem([props.position, _defineProperty({}, props.type, !props.icon)]), props.className],
        "lockScroll": false,
        "transition": props.transition,
        "onClick": onClick,
        "onClosed": clearTimer
      }, {
        default: function _default() {
          return [renderIcon(), renderMessage()];
        }
      });
    };
  }
});