import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { ref, watch, computed, Teleport, Transition, createVNode, resolveDirective, vShow, withDirectives } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { createNamespace, stopPropagation } from '../utils';
import { useClickAway } from '@vant/use';
import Key from './Key';

var _createNamespace = createNamespace('number-keyboard'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
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
    var root = ref();

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
      return [].concat(_toConsumableArray(genBasicKeys()), [{
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

    var keys = computed(function () {
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

      return createVNode("div", {
        "class": bem('header')
      }, [leftSlot && createVNode("span", {
        "class": bem('title-left')
      }, [leftSlot()]), title && createVNode("h2", {
        "class": bem('title')
      }, [title]), showClose && createVNode("button", {
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

        return createVNode(Key, {
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
        return createVNode("div", {
          "class": bem('sidebar')
        }, [props.showDeleteKey && createVNode(Key, {
          "large": true,
          "text": props.deleteButtonText,
          "type": "delete",
          "onPress": onPress
        }, {
          delete: slots.delete
        }), createVNode(Key, {
          "large": true,
          "text": props.closeButtonText,
          "type": "close",
          "color": "blue",
          "loading": props.closeButtonLoading,
          "onPress": onPress
        }, null)]);
      }
    };

    watch(function () {
      return props.show;
    }, function (value) {
      if (!props.transition) {
        emit(value ? 'show' : 'hide');
      }
    });
    useClickAway(root, onClose, {
      eventName: 'touchstart'
    });
    return function () {
      var Title = renderTitle();
      var Content = createVNode(Transition, {
        "name": props.transition ? 'van-slide-up' : ''
      }, {
        default: function _default() {
          return [withDirectives(createVNode("div", {
            "ref": root,
            "style": {
              zIndex: props.zIndex
            },
            "class": bem({
              unfit: !props.safeAreaInsetBottom,
              'with-title': !!Title
            }),
            "onTouchstart": stopPropagation,
            "onAnimationend": onAnimationEnd,
            "onWebkitAnimationEnd": onAnimationEnd
          }, [Title, createVNode("div", {
            "class": bem('body')
          }, [createVNode("div", {
            "class": bem('keys')
          }, [renderKeys()]), renderSidebar()])]), [[vShow, props.show]])];
        }
      });

      if (props.teleport) {
        return createVNode(Teleport, {
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