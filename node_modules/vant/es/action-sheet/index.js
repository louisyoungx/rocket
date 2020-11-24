import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createVNode, mergeProps } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Utils
import { createNamespace, pick } from '../utils'; // Components

import Icon from '../icon';
import Popup, { popupSharedProps } from '../popup';
import Loading from '../loading';

var _createNamespace = createNamespace('action-sheet'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: _objectSpread(_objectSpread({}, popupSharedProps), {}, {
    title: String,
    actions: Array,
    cancelText: String,
    description: String,
    closeOnPopstate: Boolean,
    closeOnClickAction: Boolean,
    round: {
      type: Boolean,
      default: true
    },
    closeable: {
      type: Boolean,
      default: true
    },
    closeIcon: {
      type: String,
      default: 'cross'
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  }),
  emits: ['select', 'cancel', 'update:show'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;
    var popupPropKeys = Object.keys(popupSharedProps);

    var onUpdateShow = function onUpdateShow(show) {
      emit('update:show', show);
    };

    var onCancel = function onCancel() {
      onUpdateShow(false);
      emit('cancel');
    };

    var renderHeader = function renderHeader() {
      if (props.title) {
        return createVNode("div", {
          "class": bem('header')
        }, [props.title, props.closeable && createVNode(Icon, {
          "name": props.closeIcon,
          "class": bem('close'),
          "onClick": onCancel
        }, null)]);
      }
    };

    var renderCancel = function renderCancel() {
      if (props.cancelText) {
        return [createVNode("div", {
          "class": bem('gap')
        }, null), createVNode("button", {
          "type": "button",
          "class": bem('cancel'),
          "onClick": onCancel
        }, [props.cancelText])];
      }
    };

    var renderOption = function renderOption(item, index) {
      var name = item.name,
          color = item.color,
          subname = item.subname,
          loading = item.loading,
          callback = item.callback,
          disabled = item.disabled,
          className = item.className;
      var Content = loading ? createVNode(Loading, {
        "class": bem('loading-icon')
      }, null) : [createVNode("span", {
        "class": bem('name')
      }, [name]), subname && createVNode("div", {
        "class": bem('subname')
      }, [subname])];

      var onClick = function onClick() {
        if (disabled || loading) {
          return;
        }

        if (callback) {
          callback(item);
        }

        emit('select', item, index);

        if (props.closeOnClickAction) {
          onUpdateShow(false);
        }
      };

      return createVNode("button", {
        "type": "button",
        "style": {
          color: color
        },
        "class": [bem('item', {
          loading: loading,
          disabled: disabled
        }), className],
        "onClick": onClick
      }, [Content]);
    };

    var renderDescription = function renderDescription() {
      if (props.description || slots.description) {
        var content = slots.description ? slots.description() : props.description;
        return createVNode("div", {
          "class": bem('description')
        }, [content]);
      }
    };

    var renderOptions = function renderOptions() {
      if (props.actions) {
        return props.actions.map(renderOption);
      }
    };

    return function () {
      var _slots$default;

      return createVNode(Popup, mergeProps({
        "class": bem(),
        "round": props.round,
        "position": "bottom"
      }, _objectSpread(_objectSpread({}, pick(props, popupPropKeys)), {}, {
        'onUpdate:show': onUpdateShow
      })), {
        default: function _default() {
          return [renderHeader(), renderDescription(), createVNode("div", {
            "class": bem('content')
          }, [renderOptions(), (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]), renderCancel()];
        }
      });
    };
  }
});