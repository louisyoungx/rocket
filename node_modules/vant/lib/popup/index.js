"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.popupSharedProps = void 0;

var _vue = require("vue");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _use = require("@vant/use");

var _useExpose = require("../composables/use-expose");

var _useLockScroll3 = require("../composables/use-lock-scroll");

var _useLazyRender = require("../composables/use-lazy-render");

var _icon = _interopRequireDefault(require("../icon"));

var _overlay = _interopRequireDefault(require("../overlay"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _createNamespace = (0, _utils.createNamespace)('popup'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var context = {
  zIndex: 2000,
  lockCount: 0,
  stack: [],
  find: function find(vm) {
    return this.stack.filter(function (item) {
      return item.vm === vm;
    })[0];
  }
};
var popupSharedProps = {
  // whether to show popup
  show: Boolean,
  // z-index
  zIndex: [Number, String],
  // transition duration
  duration: [Number, String],
  // teleport
  teleport: [String, Object],
  // overlay custom style
  overlayStyle: Object,
  // overlay custom class name
  overlayClass: String,
  // Initial rendering animation
  transitionAppear: Boolean,
  // whether to show overlay
  overlay: {
    type: Boolean,
    default: true
  },
  // prevent body scroll
  lockScroll: {
    type: Boolean,
    default: true
  },
  // whether to lazy render
  lazyRender: {
    type: Boolean,
    default: true
  },
  // whether to close popup when overlay is clicked
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  }
};
exports.popupSharedProps = popupSharedProps;

var _default2 = createComponent({
  inheritAttrs: false,
  props: _objectSpread(_objectSpread({}, popupSharedProps), {}, {
    round: Boolean,
    closeable: Boolean,
    transition: String,
    closeOnPopstate: Boolean,
    safeAreaInsetBottom: Boolean,
    position: {
      type: String,
      default: 'center'
    },
    closeIcon: {
      type: String,
      default: 'cross'
    },
    closeIconPosition: {
      type: String,
      default: 'top-right'
    }
  }),
  emits: ['open', 'close', 'click', 'opened', 'closed', 'update:show', 'click-overlay', 'click-close-icon'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        attrs = _ref.attrs,
        slots = _ref.slots;
    var opened;
    var shouldReopen;
    var zIndex = (0, _vue.ref)();
    var popupRef = (0, _vue.ref)();

    var _useLockScroll = (0, _useLockScroll3.useLockScroll)(function () {
      return props.lockScroll;
    }),
        _useLockScroll2 = (0, _slicedToArray2.default)(_useLockScroll, 2),
        lockScroll = _useLockScroll2[0],
        unlockScroll = _useLockScroll2[1];

    var lazyRender = (0, _useLazyRender.useLazyRender)(function () {
      return props.show || !props.lazyRender;
    });
    var style = (0, _vue.computed)(function () {
      var style = {
        zIndex: zIndex.value
      };

      if ((0, _utils.isDef)(props.duration)) {
        var key = props.position === 'center' ? 'animationDuration' : 'transitionDuration';
        style[key] = "".concat(props.duration, "s");
      }

      return style;
    });

    var open = function open() {
      if (!opened) {
        if (props.zIndex !== undefined) {
          context.zIndex = props.zIndex;
        }

        opened = true;
        lockScroll();
        zIndex.value = ++context.zIndex;
      }
    };

    var close = function close() {
      if (opened) {
        opened = false;
        unlockScroll();
        emit('update:show', false);
      }
    };

    var onClickOverlay = function onClickOverlay() {
      emit('click-overlay');

      if (props.closeOnClickOverlay) {
        close();
      }
    };

    var renderOverlay = function renderOverlay() {
      if (props.overlay) {
        return (0, _vue.createVNode)(_overlay.default, {
          "show": props.show,
          "class": props.overlayClass,
          "style": props.overlayStyle,
          "zIndex": zIndex.value,
          "duration": props.duration,
          "onClick": onClickOverlay
        }, null);
      }
    };

    var onClickCloseIcon = function onClickCloseIcon(event) {
      emit('click-close-icon', event);
      close();
    };

    var renderCloseIcon = function renderCloseIcon() {
      if (props.closeable) {
        return (0, _vue.createVNode)(_icon.default, {
          "role": "button",
          "tabindex": "0",
          "name": props.closeIcon,
          "class": bem('close-icon', props.closeIconPosition),
          "onClick": onClickCloseIcon
        }, null);
      }
    };

    var onClick = function onClick(event) {
      return emit('click', event);
    };

    var onOpened = function onOpened() {
      return emit('opened');
    };

    var onClosed = function onClosed() {
      return emit('closed');
    };

    var renderPopup = lazyRender(function () {
      var _bem, _slots$default;

      var round = props.round,
          position = props.position,
          safeAreaInsetBottom = props.safeAreaInsetBottom;
      return (0, _vue.withDirectives)((0, _vue.createVNode)("div", (0, _vue.mergeProps)({
        "ref": popupRef,
        "style": style.value,
        "class": bem((_bem = {
          round: round
        }, (0, _defineProperty2.default)(_bem, position, position), (0, _defineProperty2.default)(_bem, 'safe-area-inset-bottom', safeAreaInsetBottom), _bem)),
        "onClick": onClick
      }, attrs), [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots), renderCloseIcon()]), [[_vue.vShow, props.show]]);
    });

    var renderTransition = function renderTransition() {
      var position = props.position,
          transition = props.transition,
          transitionAppear = props.transitionAppear;
      var name = position === 'center' ? 'van-fade' : "van-popup-slide-".concat(position);
      return (0, _vue.createVNode)(_vue.Transition, {
        "name": transition || name,
        "transitionAppear": transitionAppear,
        "onAfterEnter": onOpened,
        "onAfterLeave": onClosed
      }, {
        default: function _default() {
          return [renderPopup()];
        }
      });
    };

    (0, _vue.watch)(function () {
      return props.show;
    }, function (value) {
      if (value) {
        open();
        emit('open');
      } else {
        close();
        emit('close');
      }
    });
    (0, _useExpose.useExpose)({
      popupRef: popupRef
    });
    (0, _use.useEventListener)('popstate', function () {
      if (props.closeOnPopstate) {
        close();
        shouldReopen = false;
      }
    });
    (0, _vue.onMounted)(function () {
      if (props.show) {
        open();
      }
    });
    (0, _vue.onActivated)(function () {
      if (shouldReopen) {
        emit('update:show', true);
        shouldReopen = false;
      }
    });
    (0, _vue.onDeactivated)(function () {
      if (props.show) {
        close();
        shouldReopen = true;
      }
    });
    (0, _vue.onBeforeMount)(function () {
      if (opened) {
        unlockScroll();
      }
    });
    return function () {
      if (props.teleport) {
        return (0, _vue.createVNode)(_vue.Teleport, {
          "to": props.teleport
        }, {
          default: function _default() {
            return [renderOverlay(), renderTransition()];
          }
        });
      }

      return (0, _vue.createVNode)(_vue.Fragment, null, [renderOverlay(), renderTransition()]);
    };
  }
});

exports.default = _default2;