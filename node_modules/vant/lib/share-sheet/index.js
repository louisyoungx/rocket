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

var _popup = _interopRequireWildcard(require("../popup"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var PRESET_ICONS = ['qq', 'weibo', 'wechat', 'link', 'qrcode', 'poster'];

function getIconURL(icon) {
  if (PRESET_ICONS.indexOf(icon) !== -1) {
    return "https://img.yzcdn.cn/vant/share-icon-".concat(icon, ".png");
  }

  return icon;
}

var _createNamespace = (0, _utils.createNamespace)('share-sheet'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 3),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1],
    t = _createNamespace2[2];

var _default2 = createComponent({
  props: _objectSpread(_objectSpread({}, _popup.popupSharedProps), {}, {
    title: String,
    cancelText: String,
    description: String,
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  }),
  emits: ['cancel', 'select', 'update:show'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var toggle = function toggle(value) {
      emit('update:show', value);
    };

    var onCancel = function onCancel() {
      toggle(false);
      emit('cancel');
    };

    var onSelect = function onSelect(option, index) {
      emit('select', option, index);
    };

    var renderHeader = function renderHeader() {
      var title = slots.title ? slots.title() : props.title;
      var description = slots.description ? slots.description() : props.description;

      if (title || description) {
        return (0, _vue.createVNode)("div", {
          "class": bem('header')
        }, [title && (0, _vue.createVNode)("h2", {
          "class": bem('title')
        }, [title]), description && (0, _vue.createVNode)("span", {
          "class": bem('description')
        }, [description])]);
      }
    };

    var renderOption = function renderOption(option, index) {
      var name = option.name,
          icon = option.icon,
          className = option.className,
          description = option.description;
      return (0, _vue.createVNode)("div", {
        "role": "button",
        "tabindex": "0",
        "class": [bem('option'), className],
        "onClick": function onClick() {
          onSelect(option, index);
        }
      }, [(0, _vue.createVNode)("img", {
        "src": getIconURL(icon),
        "class": bem('icon')
      }, null), name && (0, _vue.createVNode)("span", {
        "class": bem('name')
      }, [name]), description && (0, _vue.createVNode)("span", {
        "class": bem('option-description')
      }, [description])]);
    };

    var renderOptions = function renderOptions(options, border) {
      return (0, _vue.createVNode)("div", {
        "class": bem('options', {
          border: border
        })
      }, [options.map(renderOption)]);
    };

    var renderRows = function renderRows() {
      var options = props.options;

      if (Array.isArray(options[0])) {
        return options.map(function (item, index) {
          return renderOptions(item, index !== 0);
        });
      }

      return renderOptions(options);
    };

    var renderCancelText = function renderCancelText() {
      var _props$cancelText;

      var text = (_props$cancelText = props.cancelText) !== null && _props$cancelText !== void 0 ? _props$cancelText : t('cancel');

      if (text) {
        return (0, _vue.createVNode)("button", {
          "type": "button",
          "class": bem('cancel'),
          "onClick": onCancel
        }, [text]);
      }
    };

    return function () {
      return (0, _vue.createVNode)(_popup.default, (0, _vue.mergeProps)({
        "round": true,
        "class": bem(),
        "position": "bottom"
      }, _objectSpread(_objectSpread({}, (0, _utils.pick)(props, ['show', 'overlay', 'duration', 'teleport', 'lazyRender', 'lockScroll', 'closeOnPopstate', 'closeOnClickOverlay', 'safeAreaInsetBottom'])), {}, {
        'onUpdate:show': toggle
      })), {
        default: function _default() {
          return [renderHeader(), renderRows(), renderCancelText()];
        }
      });
    };
  }
});

exports.default = _default2;