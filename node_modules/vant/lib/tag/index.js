"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _icon = _interopRequireDefault(require("../icon"));

var _createNamespace = (0, _utils.createNamespace)('tag'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default2 = createComponent({
  props: {
    size: String,
    mark: Boolean,
    color: String,
    plain: Boolean,
    round: Boolean,
    textColor: String,
    closeable: Boolean,
    type: {
      type: String,
      default: 'default'
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  emits: ['close'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;

    var onClose = function onClose(event) {
      event.stopPropagation();
      emit('close');
    };

    var getStyle = function getStyle() {
      if (props.plain) {
        return {
          color: props.textColor || props.color
        };
      }

      return {
        color: props.textColor,
        background: props.color
      };
    };

    return function () {
      var _slots$default;

      var show = props.show,
          type = props.type,
          mark = props.mark,
          plain = props.plain,
          round = props.round,
          size = props.size,
          closeable = props.closeable;
      var classes = {
        mark: mark,
        plain: plain,
        round: round
      };

      if (size) {
        classes[size] = size;
      }

      var CloseIcon = closeable && (0, _vue.createVNode)(_icon.default, {
        "name": "cross",
        "class": bem('close'),
        "onClick": onClose
      }, null);
      return (0, _vue.createVNode)(_vue.Transition, {
        "name": closeable ? 'van-fade' : undefined
      }, {
        default: function _default() {
          return [show ? (0, _vue.createVNode)("span", {
            "style": getStyle(),
            "class": bem([classes, type])
          }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots), CloseIcon]) : null];
        }
      });
    };
  }
});

exports.default = _default2;