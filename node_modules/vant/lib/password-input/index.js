"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _constant = require("../utils/constant");

var _createNamespace = (0, _utils.createNamespace)('password-input'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default = createComponent({
  props: {
    info: String,
    gutter: [Number, String],
    focused: Boolean,
    errorInfo: String,
    mask: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ''
    },
    length: {
      type: [Number, String],
      default: 6
    }
  },
  emits: ['focus'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var onTouchStart = function onTouchStart(event) {
      event.stopPropagation();
      emit('focus', event);
    };

    var renderPoints = function renderPoints() {
      var Points = [];
      var mask = props.mask,
          value = props.value,
          length = props.length,
          gutter = props.gutter,
          focused = props.focused;

      for (var i = 0; i < length; i++) {
        var _char = value[i];
        var showBorder = i !== 0 && !gutter;
        var showCursor = focused && i === value.length;
        var style = void 0;

        if (i !== 0 && gutter) {
          style = {
            marginLeft: (0, _utils.addUnit)(gutter)
          };
        }

        Points.push((0, _vue.createVNode)("li", {
          "class": [(0, _defineProperty2.default)({}, _constant.BORDER_LEFT, showBorder), bem('item', {
            focus: showCursor
          })],
          "style": style
        }, [mask ? (0, _vue.createVNode)("i", {
          "style": {
            visibility: _char ? 'visible' : 'hidden'
          }
        }, null) : _char, showCursor && (0, _vue.createVNode)("div", {
          "class": bem('cursor')
        }, null)]));
      }

      return Points;
    };

    return function () {
      var info = props.errorInfo || props.info;
      return (0, _vue.createVNode)("div", {
        "class": bem()
      }, [(0, _vue.createVNode)("ul", {
        "class": [bem('security'), (0, _defineProperty2.default)({}, _constant.BORDER_SURROUND, !props.gutter)],
        "onTouchstart": onTouchStart
      }, [renderPoints()]), info && (0, _vue.createVNode)("div", {
        "class": bem(props.errorInfo ? 'error-info' : 'info')
      }, [info])]);
    };
  }
});

exports.default = _default;