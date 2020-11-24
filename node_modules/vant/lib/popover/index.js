"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _popperLite = require("@popperjs/core/lib/popper-lite");

var _offset = _interopRequireDefault(require("@popperjs/core/lib/modifiers/offset"));

var _extends = _interopRequireDefault(require("@babel/runtime/helpers/esm/extends"));

var _utils = require("../utils");

var _constant = require("../utils/constant");

var _use = require("@vant/use");

var _icon = _interopRequireDefault(require("../icon"));

var _popup = _interopRequireDefault(require("../popup"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// add Object.assign polyfill for popper.js
// see: https://popper.js.org/docs/v2/browser-support/

/* istanbul ignore if */
if (!Object.assign) {
  Object.assign = _extends.default;
}

var _createNamespace = (0, _utils.createNamespace)('popover'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default2 = createComponent({
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
    var wrapperRef = (0, _vue.ref)();
    var popoverRef = (0, _vue.ref)();

    var createPopperInstance = function createPopperInstance() {
      return (0, _popperLite.createPopper)(wrapperRef.value, popoverRef.value.popupRef.value, {
        placement: props.placement,
        modifiers: [{
          name: 'computeStyles',
          options: {
            adaptive: false,
            gpuAcceleration: false
          }
        }, _objectSpread(_objectSpread({}, _offset.default), {}, {
          options: {
            offset: props.offset
          }
        })]
      });
    };

    var updateLocation = function updateLocation() {
      (0, _vue.nextTick)(function () {
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
      return (0, _vue.createVNode)("div", {
        "class": [bem('action', {
          disabled: disabled,
          'with-icon': icon
        }), className],
        "onClick": function onClick() {
          return onClickAction(action, index);
        }
      }, [icon && (0, _vue.createVNode)(_icon.default, {
        "name": icon,
        "class": bem('action-icon')
      }, null), (0, _vue.createVNode)("div", {
        "class": [bem('action-text'), _constant.BORDER_BOTTOM]
      }, [text])]);
    };

    (0, _vue.onMounted)(updateLocation);
    (0, _vue.onBeforeUnmount)(function () {
      if (popper) {
        popper.destroy();
        popper = null;
      }
    });
    (0, _vue.watch)([function () {
      return props.show;
    }, function () {
      return props.placement;
    }], updateLocation);
    (0, _use.useClickAway)(wrapperRef, onClickAway, {
      eventName: 'touchstart'
    });
    return function () {
      var _slots$reference;

      return (0, _vue.createVNode)("span", {
        "ref": wrapperRef,
        "class": bem('wrapper')
      }, [(0, _vue.createVNode)(_popup.default, (0, _vue.mergeProps)({
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
          return [(0, _vue.createVNode)("div", {
            "class": bem('arrow')
          }, null), (0, _vue.createVNode)("div", {
            "class": bem('content')
          }, [slots.default ? slots.default() : props.actions.map(renderAction)])];
        }
      }), (_slots$reference = slots.reference) === null || _slots$reference === void 0 ? void 0 : _slots$reference.call(slots)]);
    };
  }
});

exports.default = _default2;