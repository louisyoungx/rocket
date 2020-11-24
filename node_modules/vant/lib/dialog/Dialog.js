"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _interceptor = require("../utils/interceptor");

var _utils = require("../utils");

var _constant = require("../utils/constant");

var _popup = _interopRequireWildcard(require("../popup"));

var _button = _interopRequireDefault(require("../button"));

var _actionBar = _interopRequireDefault(require("../action-bar"));

var _actionBarButton = _interopRequireDefault(require("../action-bar-button"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _createNamespace = (0, _utils.createNamespace)('dialog'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 3),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1],
    t = _createNamespace2[2];

var popupKeys = [].concat((0, _toConsumableArray2.default)(Object.keys(_popup.popupSharedProps)), ['transition', 'closeOnPopstate']);

var _default2 = createComponent({
  props: _objectSpread(_objectSpread({}, _popup.popupSharedProps), {}, {
    title: String,
    theme: String,
    width: [Number, String],
    message: String,
    callback: Function,
    allowHtml: Boolean,
    className: null,
    beforeClose: Function,
    messageAlign: String,
    showCancelButton: Boolean,
    cancelButtonText: String,
    cancelButtonColor: String,
    confirmButtonText: String,
    confirmButtonColor: String,
    closeOnClickOverlay: Boolean,
    transition: {
      type: String,
      default: 'van-dialog-bounce'
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    }
  }),
  emits: ['confirm', 'cancel', 'update:show'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var loading = (0, _vue.reactive)({
      confirm: false,
      cancel: false
    });

    var onUpdateShow = function onUpdateShow(value) {
      emit('update:show', value);
    };

    var close = function close(action) {
      onUpdateShow(false);

      if (props.callback) {
        props.callback(action);
      }
    };

    var handleAction = function handleAction(action) {
      // should not trigger close event when hidden
      if (!props.show) {
        return;
      }

      emit(action);

      if (props.beforeClose) {
        loading[action] = true;
        (0, _interceptor.callInterceptor)({
          interceptor: props.beforeClose,
          args: [action],
          done: function done() {
            close(action);
            loading[action] = false;
          },
          canceled: function canceled() {
            loading[action] = false;
          }
        });
      } else {
        close(action);
      }
    };

    var renderTitle = function renderTitle() {
      var title = slots.title ? slots.title() : props.title;

      if (title) {
        return (0, _vue.createVNode)("div", {
          "class": bem('header', {
            isolated: !props.message && !slots.default
          })
        }, [title]);
      }
    };

    var renderContent = function renderContent() {
      if (slots.default) {
        return (0, _vue.createVNode)("div", {
          "class": bem('content')
        }, [slots.default()]);
      }

      var title = props.title,
          message = props.message,
          allowHtml = props.allowHtml,
          messageAlign = props.messageAlign;

      if (message) {
        var hasTitle = title || slots.title;
        return (0, _vue.createVNode)("div", {
          "class": bem('content', {
            isolated: !hasTitle
          })
        }, [(0, _vue.createVNode)("div", (0, _vue.mergeProps)({
          "class": bem('message', (0, _defineProperty2.default)({
            'has-title': hasTitle
          }, messageAlign, messageAlign))
        }, (0, _defineProperty2.default)({}, allowHtml ? 'innerHTML' : 'textContent', message)), null)]);
      }
    };

    var renderButtons = function renderButtons() {
      return (0, _vue.createVNode)("div", {
        "class": [_constant.BORDER_TOP, bem('footer')]
      }, [props.showCancelButton && (0, _vue.createVNode)(_button.default, {
        "size": "large",
        "text": props.cancelButtonText || t('cancel'),
        "class": bem('cancel'),
        "style": {
          color: props.cancelButtonColor
        },
        "loading": loading.cancel,
        "onClick": function onClick() {
          handleAction('cancel');
        }
      }, null), props.showConfirmButton && (0, _vue.createVNode)(_button.default, {
        "size": "large",
        "text": props.confirmButtonText || t('confirm'),
        "class": [bem('confirm'), (0, _defineProperty2.default)({}, _constant.BORDER_LEFT, props.showCancelButton)],
        "style": {
          color: props.confirmButtonColor
        },
        "loading": loading.confirm,
        "onClick": function onClick() {
          handleAction('confirm');
        }
      }, null)]);
    };

    var renderRoundButtons = function renderRoundButtons() {
      return (0, _vue.createVNode)(_actionBar.default, {
        "class": bem('footer')
      }, {
        default: function _default() {
          return [props.showCancelButton && (0, _vue.createVNode)(_actionBarButton.default, {
            "size": "large",
            "type": "warning",
            "text": props.cancelButtonText || t('cancel'),
            "class": bem('cancel'),
            "color": props.cancelButtonColor,
            "loading": loading.cancel,
            "onClick": function onClick() {
              handleAction('cancel');
            }
          }, null), props.showConfirmButton && (0, _vue.createVNode)(_actionBarButton.default, {
            "size": "large",
            "type": "danger",
            "text": props.confirmButtonText || t('confirm'),
            "class": bem('confirm'),
            "color": props.confirmButtonColor,
            "loading": loading.confirm,
            "onClick": function onClick() {
              handleAction('confirm');
            }
          }, null)];
        }
      });
    };

    return function () {
      var width = props.width,
          title = props.title,
          theme = props.theme,
          message = props.message,
          className = props.className;
      return (0, _vue.createVNode)(_popup.default, (0, _vue.mergeProps)({
        "role": "dialog",
        "class": [bem([theme]), className],
        "style": {
          width: (0, _utils.addUnit)(width)
        },
        "aria-labelledby": title || message
      }, _objectSpread(_objectSpread({}, (0, _utils.pick)(props, popupKeys)), {}, {
        'onUpdate:show': onUpdateShow
      })), {
        default: function _default() {
          return [renderTitle(), renderContent(), theme === 'round-button' ? renderRoundButtons() : renderButtons()];
        }
      });
    };
  }
});

exports.default = _default2;