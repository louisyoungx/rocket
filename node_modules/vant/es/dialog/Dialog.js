import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { reactive, createVNode, mergeProps } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Utils
import { callInterceptor } from '../utils/interceptor';
import { createNamespace, addUnit, pick } from '../utils';
import { BORDER_TOP, BORDER_LEFT } from '../utils/constant'; // Components

import Popup, { popupSharedProps } from '../popup';
import Button from '../button';
import ActionBar from '../action-bar';
import ActionBarButton from '../action-bar-button';

var _createNamespace = createNamespace('dialog'),
    _createNamespace2 = _slicedToArray(_createNamespace, 3),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1],
    t = _createNamespace2[2];

var popupKeys = [].concat(_toConsumableArray(Object.keys(popupSharedProps)), ['transition', 'closeOnPopstate']);
export default createComponent({
  props: _objectSpread(_objectSpread({}, popupSharedProps), {}, {
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
    var loading = reactive({
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
        callInterceptor({
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
        return createVNode("div", {
          "class": bem('header', {
            isolated: !props.message && !slots.default
          })
        }, [title]);
      }
    };

    var renderContent = function renderContent() {
      if (slots.default) {
        return createVNode("div", {
          "class": bem('content')
        }, [slots.default()]);
      }

      var title = props.title,
          message = props.message,
          allowHtml = props.allowHtml,
          messageAlign = props.messageAlign;

      if (message) {
        var hasTitle = title || slots.title;
        return createVNode("div", {
          "class": bem('content', {
            isolated: !hasTitle
          })
        }, [createVNode("div", mergeProps({
          "class": bem('message', _defineProperty({
            'has-title': hasTitle
          }, messageAlign, messageAlign))
        }, _defineProperty({}, allowHtml ? 'innerHTML' : 'textContent', message)), null)]);
      }
    };

    var renderButtons = function renderButtons() {
      return createVNode("div", {
        "class": [BORDER_TOP, bem('footer')]
      }, [props.showCancelButton && createVNode(Button, {
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
      }, null), props.showConfirmButton && createVNode(Button, {
        "size": "large",
        "text": props.confirmButtonText || t('confirm'),
        "class": [bem('confirm'), _defineProperty({}, BORDER_LEFT, props.showCancelButton)],
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
      return createVNode(ActionBar, {
        "class": bem('footer')
      }, {
        default: function _default() {
          return [props.showCancelButton && createVNode(ActionBarButton, {
            "size": "large",
            "type": "warning",
            "text": props.cancelButtonText || t('cancel'),
            "class": bem('cancel'),
            "color": props.cancelButtonColor,
            "loading": loading.cancel,
            "onClick": function onClick() {
              handleAction('cancel');
            }
          }, null), props.showConfirmButton && createVNode(ActionBarButton, {
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
      return createVNode(Popup, mergeProps({
        "role": "dialog",
        "class": [bem([theme]), className],
        "style": {
          width: addUnit(width)
        },
        "aria-labelledby": title || message
      }, _objectSpread(_objectSpread({}, pick(props, popupKeys)), {}, {
        'onUpdate:show': onUpdateShow
      })), {
        default: function _default() {
          return [renderTitle(), renderContent(), theme === 'round-button' ? renderRoundButtons() : renderButtons()];
        }
      });
    };
  }
});