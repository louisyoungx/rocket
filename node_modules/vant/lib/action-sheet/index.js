"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _icon = _interopRequireDefault(require("../icon"));

var _popup = _interopRequireWildcard(require("../popup"));

var _loading = _interopRequireDefault(require("../loading"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _createNamespace = (0, _utils.createNamespace)('action-sheet'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default2 = createComponent({
  props: _objectSpread(_objectSpread({}, _popup.popupSharedProps), {}, {
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
    var popupPropKeys = Object.keys(_popup.popupSharedProps);

    var onUpdateShow = function onUpdateShow(show) {
      emit('update:show', show);
    };

    var onCancel = function onCancel() {
      onUpdateShow(false);
      emit('cancel');
    };

    var renderHeader = function renderHeader() {
      if (props.title) {
        return (0, _vue.createVNode)("div", {
          "class": bem('header')
        }, [props.title, props.closeable && (0, _vue.createVNode)(_icon.default, {
          "name": props.closeIcon,
          "class": bem('close'),
          "onClick": onCancel
        }, null)]);
      }
    };

    var renderCancel = function renderCancel() {
      if (props.cancelText) {
        return [(0, _vue.createVNode)("div", {
          "class": bem('gap')
        }, null), (0, _vue.createVNode)("button", {
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
      var Content = loading ? (0, _vue.createVNode)(_loading.default, {
        "class": bem('loading-icon')
      }, null) : [(0, _vue.createVNode)("span", {
        "class": bem('name')
      }, [name]), subname && (0, _vue.createVNode)("div", {
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

      return (0, _vue.createVNode)("button", {
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
        return (0, _vue.createVNode)("div", {
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

      return (0, _vue.createVNode)(_popup.default, (0, _vue.mergeProps)({
        "class": bem(),
        "round": props.round,
        "position": "bottom"
      }, _objectSpread(_objectSpread({}, (0, _utils.pick)(props, popupPropKeys)), {}, {
        'onUpdate:show': onUpdateShow
      })), {
        default: function _default() {
          return [renderHeader(), renderDescription(), (0, _vue.createVNode)("div", {
            "class": bem('content')
          }, [renderOptions(), (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]), renderCancel()];
        }
      });
    };
  }
});

exports.default = _default2;