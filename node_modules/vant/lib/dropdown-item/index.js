"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _dropdownMenu = require("../dropdown-menu");

var _use = require("@vant/use");

var _useExpose = require("../composables/use-expose");

var _cell = _interopRequireDefault(require("../cell"));

var _icon = _interopRequireDefault(require("../icon"));

var _popup = _interopRequireDefault(require("../popup"));

// Utils
// Composition
// Components
var _createNamespace = (0, _utils.createNamespace)('dropdown-item'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default2 = createComponent({
  props: {
    title: String,
    disabled: Boolean,
    teleport: [String, Object],
    modelValue: null,
    titleClass: String,
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    lazyRender: {
      type: Boolean,
      default: true
    }
  },
  emits: ['open', 'opened', 'close', 'closed', 'change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var state = (0, _vue.reactive)({
      showPopup: false,
      transition: true,
      showWrapper: false
    });

    var _useParent = (0, _use.useParent)(_dropdownMenu.DROPDOWN_KEY),
        parent = _useParent.parent;

    var createEmitter = function createEmitter(eventName) {
      return function () {
        return emit(eventName);
      };
    };

    var onOpen = createEmitter('open');
    var onClose = createEmitter('close');
    var onOpened = createEmitter('opened');

    var onClosed = function onClosed() {
      state.showWrapper = false;
      emit('closed');
    };

    var onClickWrapper = function onClickWrapper(event) {
      // prevent being identified as clicking outside and closed when using teleport
      if (props.teleport) {
        event.stopPropagation();
      }
    };

    var toggle = function toggle() {
      var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !state.showPopup;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (show === state.showPopup) {
        return;
      }

      state.showPopup = show;
      state.transition = !options.immediate;

      if (show) {
        state.showWrapper = true;
      }
    };

    var renderTitle = function renderTitle() {
      if (slots.title) {
        return slots.title();
      }

      if (props.title) {
        return props.title;
      }

      var match = props.options.filter(function (option) {
        return option.value === props.modelValue;
      });
      return match.length ? match[0].text : '';
    };

    var renderOption = function renderOption(option) {
      var activeColor = parent.props.activeColor;
      var active = option.value === props.modelValue;

      var onClick = function onClick() {
        state.showPopup = false;

        if (option.value !== props.modelValue) {
          emit('update:modelValue', option.value);
          emit('change', option.value);
        }
      };

      return (0, _vue.createVNode)(_cell.default, {
        "clickable": true,
        "key": option.value,
        "icon": option.icon,
        "title": option.text,
        "class": bem('option', {
          active: active
        }),
        "style": {
          color: active ? activeColor : ''
        },
        "onClick": onClick
      }, {
        default: function _default() {
          return [active && (0, _vue.createVNode)(_icon.default, {
            "class": bem('icon'),
            "color": activeColor,
            "name": "success"
          }, null)];
        }
      });
    };

    var renderContent = function renderContent() {
      var _slots$default;

      var offset = parent.offset;
      var _parent$props = parent.props,
          zIndex = _parent$props.zIndex,
          overlay = _parent$props.overlay,
          duration = _parent$props.duration,
          direction = _parent$props.direction,
          closeOnClickOverlay = _parent$props.closeOnClickOverlay;
      var style = {
        zIndex: zIndex
      };

      if (direction === 'down') {
        style.top = "".concat(offset.value, "px");
      } else {
        style.bottom = "".concat(offset.value, "px");
      }

      return (0, _vue.withDirectives)((0, _vue.createVNode)("div", {
        "style": style,
        "class": bem([direction]),
        "onClick": onClickWrapper
      }, [(0, _vue.createVNode)(_popup.default, {
        'show': state.showPopup,
        "onUpdate:show": function onUpdateShow($event) {
          return state.showPopup = $event;
        },
        "class": bem('content'),
        "overlay": overlay,
        "position": direction === 'down' ? 'top' : 'bottom',
        "duration": state.transition ? duration : 0,
        "lazyRender": props.lazyRender,
        "overlayStyle": {
          position: 'absolute'
        },
        "closeOnClickOverlay": closeOnClickOverlay,
        "onOpen": onOpen,
        "onClose": onClose,
        "onOpened": onOpened,
        "onClosed": onClosed
      }, {
        default: function _default() {
          return [props.options.map(renderOption), (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)];
        }
      })]), [[_vue.vShow, state.showWrapper]]);
    };

    (0, _useExpose.useExpose)({
      state: state,
      toggle: toggle,
      renderTitle: renderTitle
    });
    return function () {
      if (props.teleport) {
        return (0, _vue.createVNode)(_vue.Teleport, {
          "to": props.teleport
        }, {
          default: function _default() {
            return [renderContent()];
          }
        });
      }

      return renderContent();
    };
  }
});

exports.default = _default2;