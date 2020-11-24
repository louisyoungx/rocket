"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _use = require("@vant/use");

var _Key = _interopRequireDefault(require("./Key"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _createNamespace = (0, _utils.createNamespace)('number-keyboard'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default2 = createComponent({
  props: {
    show: Boolean,
    title: String,
    zIndex: [Number, String],
    teleport: [String, Object],
    closeButtonText: String,
    deleteButtonText: String,
    closeButtonLoading: Boolean,
    theme: {
      type: String,
      default: 'default'
    },
    modelValue: {
      type: String,
      default: ''
    },
    extraKey: {
      type: [String, Array],
      default: ''
    },
    maxlength: {
      type: [Number, String],
      default: Number.MAX_VALUE
    },
    transition: {
      type: Boolean,
      default: true
    },
    showDeleteKey: {
      type: Boolean,
      default: true
    },
    hideOnClickOutside: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  },
  emits: ['show', 'hide', 'blur', 'input', 'close', 'delete', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var root = (0, _vue.ref)();

    var genBasicKeys = function genBasicKeys() {
      var keys = [];

      for (var i = 1; i <= 9; i++) {
        keys.push({
          text: i
        });
      }

      return keys;
    };

    var genDefaultKeys = function genDefaultKeys() {
      return [].concat((0, _toConsumableArray2.default)(genBasicKeys()), [{
        text: props.extraKey,
        type: 'extra'
      }, {
        text: 0
      }, {
        text: props.showDeleteKey ? props.deleteButtonText : '',
        type: props.showDeleteKey ? 'delete' : ''
      }]);
    };

    var genCustomKeys = function genCustomKeys() {
      var keys = genBasicKeys();
      var extraKey = props.extraKey;
      var extraKeys = Array.isArray(extraKey) ? extraKey : [extraKey];

      if (extraKeys.length === 1) {
        keys.push({
          text: 0,
          wider: true
        }, {
          text: extraKeys[0],
          type: 'extra'
        });
      } else if (extraKeys.length === 2) {
        keys.push({
          text: extraKeys[0],
          type: 'extra'
        }, {
          text: 0
        }, {
          text: extraKeys[1],
          type: 'extra'
        });
      }

      return keys;
    };

    var keys = (0, _vue.computed)(function () {
      return props.theme === 'custom' ? genCustomKeys() : genDefaultKeys();
    });

    var onBlur = function onBlur() {
      if (props.show) {
        emit('blur');
      }
    };

    var onClose = function onClose() {
      emit('close');
      onBlur();
    };

    var onAnimationEnd = function onAnimationEnd() {
      emit(props.show ? 'show' : 'hide');
    };

    var onPress = function onPress(text, type) {
      if (text === '') {
        if (type === 'extra') {
          onBlur();
        }

        return;
      }

      var value = props.modelValue;

      if (type === 'delete') {
        emit('delete');
        emit('update:modelValue', value.slice(0, value.length - 1));
      } else if (type === 'close') {
        onClose();
      } else if (value.length < props.maxlength) {
        emit('input', text);
        emit('update:modelValue', value + text);
      }
    };

    var renderTitle = function renderTitle() {
      var title = props.title,
          theme = props.theme,
          closeButtonText = props.closeButtonText;
      var leftSlot = slots['title-left'];
      var showClose = closeButtonText && theme === 'default';
      var showTitle = title || showClose || leftSlot;

      if (!showTitle) {
        return;
      }

      return (0, _vue.createVNode)("div", {
        "class": bem('header')
      }, [leftSlot && (0, _vue.createVNode)("span", {
        "class": bem('title-left')
      }, [leftSlot()]), title && (0, _vue.createVNode)("h2", {
        "class": bem('title')
      }, [title]), showClose && (0, _vue.createVNode)("button", {
        "type": "button",
        "class": bem('close'),
        "onClick": onClose
      }, [closeButtonText])]);
    };

    var renderKeys = function renderKeys() {
      return keys.value.map(function (key) {
        var slots = {};

        if (key.type === 'delete') {
          slots.default = slots.delete;
        }

        if (key.type === 'extra') {
          slots.default = slots['extra-key'];
        }

        return (0, _vue.createVNode)(_Key.default, {
          "key": key.text,
          "text": key.text,
          "type": key.type,
          "wider": key.wider,
          "color": key.color,
          "onPress": onPress
        }, _objectSpread({}, slots));
      });
    };

    var renderSidebar = function renderSidebar() {
      if (props.theme === 'custom') {
        return (0, _vue.createVNode)("div", {
          "class": bem('sidebar')
        }, [props.showDeleteKey && (0, _vue.createVNode)(_Key.default, {
          "large": true,
          "text": props.deleteButtonText,
          "type": "delete",
          "onPress": onPress
        }, {
          delete: slots.delete
        }), (0, _vue.createVNode)(_Key.default, {
          "large": true,
          "text": props.closeButtonText,
          "type": "close",
          "color": "blue",
          "loading": props.closeButtonLoading,
          "onPress": onPress
        }, null)]);
      }
    };

    (0, _vue.watch)(function () {
      return props.show;
    }, function (value) {
      if (!props.transition) {
        emit(value ? 'show' : 'hide');
      }
    });
    (0, _use.useClickAway)(root, onClose, {
      eventName: 'touchstart'
    });
    return function () {
      var Title = renderTitle();
      var Content = (0, _vue.createVNode)(_vue.Transition, {
        "name": props.transition ? 'van-slide-up' : ''
      }, {
        default: function _default() {
          return [(0, _vue.withDirectives)((0, _vue.createVNode)("div", {
            "ref": root,
            "style": {
              zIndex: props.zIndex
            },
            "class": bem({
              unfit: !props.safeAreaInsetBottom,
              'with-title': !!Title
            }),
            "onTouchstart": _utils.stopPropagation,
            "onAnimationend": onAnimationEnd,
            "onWebkitAnimationEnd": onAnimationEnd
          }, [Title, (0, _vue.createVNode)("div", {
            "class": bem('body')
          }, [(0, _vue.createVNode)("div", {
            "class": bem('keys')
          }, [renderKeys()]), renderSidebar()])]), [[_vue.vShow, props.show]])];
        }
      });

      if (props.teleport) {
        return (0, _vue.createVNode)(_vue.Teleport, {
          "to": props.teleport
        }, {
          default: function _default() {
            return [Content];
          }
        });
      }

      return Content;
    };
  }
});

exports.default = _default2;