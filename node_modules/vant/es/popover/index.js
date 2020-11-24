import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { ref, watch, nextTick, onMounted, onBeforeUnmount, createVNode, mergeProps } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { createPopper } from '@popperjs/core/lib/popper-lite';
import offsetModifier from '@popperjs/core/lib/modifiers/offset';
import extendsHelper from '@babel/runtime/helpers/esm/extends'; // Utils

import { createNamespace } from '../utils';
import { BORDER_BOTTOM } from '../utils/constant'; // Composition

import { useClickAway } from '@vant/use'; // Components

import Icon from '../icon';
import Popup from '../popup'; // add Object.assign polyfill for popper.js
// see: https://popper.js.org/docs/v2/browser-support/

/* istanbul ignore if */

if (!Object.assign) {
  Object.assign = extendsHelper;
}

var _createNamespace = createNamespace('popover'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  inheritAttrs: false,
  props: {
    show: Boolean,
    overlay: Boolean,
    offset: {
      type: Array,
      default: function _default() {
        return [0, 8];
      }
    },
    theme: {
      type: String,
      default: 'light'
    },
    actions: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    teleport: {
      type: [String, Object],
      default: 'body'
    },
    closeOnClickAction: {
      type: Boolean,
      default: true
    }
  },
  emits: ['select', 'touchstart', 'update:show'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots,
        attrs = _ref.attrs;
    var popper;
    var wrapperRef = ref();
    var popoverRef = ref();

    var createPopperInstance = function createPopperInstance() {
      return createPopper(wrapperRef.value, popoverRef.value.popupRef.value, {
        placement: props.placement,
        modifiers: [{
          name: 'computeStyles',
          options: {
            adaptive: false,
            gpuAcceleration: false
          }
        }, _objectSpread(_objectSpread({}, offsetModifier), {}, {
          options: {
            offset: props.offset
          }
        })]
      });
    };

    var updateLocation = function updateLocation() {
      nextTick(function () {
        if (!props.show) {
          return;
        }

        if (!popper) {
          popper = createPopperInstance();
        } else {
          popper.setOptions({
            placement: props.placement
          });
        }
      });
    };

    var toggle = function toggle(value) {
      emit('update:show', value);
    };

    var onTouchstart = function onTouchstart(event) {
      event.stopPropagation();
      emit('touchstart', event);
    };

    var onClickAction = function onClickAction(action, index) {
      if (action.disabled) {
        return;
      }

      emit('select', action, index);

      if (props.closeOnClickAction) {
        toggle(false);
      }
    };

    var onClickAway = function onClickAway() {
      toggle(false);
    };

    var renderAction = function renderAction(action, index) {
      var icon = action.icon,
          text = action.text,
          disabled = action.disabled,
          className = action.className;
      return createVNode("div", {
        "class": [bem('action', {
          disabled: disabled,
          'with-icon': icon
        }), className],
        "onClick": function onClick() {
          return onClickAction(action, index);
        }
      }, [icon && createVNode(Icon, {
        "name": icon,
        "class": bem('action-icon')
      }, null), createVNode("div", {
        "class": [bem('action-text'), BORDER_BOTTOM]
      }, [text])]);
    };

    onMounted(updateLocation);
    onBeforeUnmount(function () {
      if (popper) {
        popper.destroy();
        popper = null;
      }
    });
    watch([function () {
      return props.show;
    }, function () {
      return props.placement;
    }], updateLocation);
    useClickAway(wrapperRef, onClickAway, {
      eventName: 'touchstart'
    });
    return function () {
      var _slots$reference;

      return createVNode("span", {
        "ref": wrapperRef,
        "class": bem('wrapper')
      }, [createVNode(Popup, mergeProps({
        "ref": popoverRef,
        "show": props.show,
        "class": bem([props.theme]),
        "overlay": props.overlay,
        "position": null,
        "teleport": props.teleport,
        "transition": "van-popover-zoom",
        "lockScroll": false,
        "onTouchstart": onTouchstart
      }, _objectSpread(_objectSpread({}, attrs), {}, {
        'onUpdate:show': toggle
      })), {
        default: function _default() {
          return [createVNode("div", {
            "class": bem('arrow')
          }, null), createVNode("div", {
            "class": bem('content')
          }, [slots.default ? slots.default() : props.actions.map(renderAction)])];
        }
      }), (_slots$reference = slots.reference) === null || _slots$reference === void 0 ? void 0 : _slots$reference.call(slots)]);
    };
  }
});