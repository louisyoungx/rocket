"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _useExpose = require("../composables/use-expose");

var _createNamespace = (0, _utils.createNamespace)('progress'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default = createComponent({
  props: {
    color: String,
    inactive: Boolean,
    pivotText: String,
    textColor: String,
    pivotColor: String,
    trackColor: String,
    strokeWidth: [Number, String],
    percentage: {
      type: [Number, String],
      required: true,
      validator: function validator(value) {
        return value >= 0 && value <= 100;
      }
    },
    showPivot: {
      type: Boolean,
      default: true
    }
  },
  setup: function setup(props) {
    var root = (0, _vue.ref)();
    var pivotRef = (0, _vue.ref)();
    var state = (0, _vue.reactive)({
      rootWidth: 0,
      pivotWidth: 0
    });
    var background = (0, _vue.computed)(function () {
      return props.inactive ? '#cacaca' : props.color;
    });

    var resize = function resize() {
      (0, _vue.nextTick)(function () {
        state.rootWidth = root.value ? root.value.offsetWidth : 0;
        state.pivotWidth = pivotRef.value ? pivotRef.value.offsetWidth : 0;
      });
    };

    var renderPivot = function renderPivot() {
      var rootWidth = state.rootWidth,
          pivotWidth = state.pivotWidth;
      var textColor = props.textColor,
          pivotText = props.pivotText,
          pivotColor = props.pivotColor,
          percentage = props.percentage;
      var text = pivotText !== null && pivotText !== void 0 ? pivotText : "".concat(percentage, "%");
      var show = props.showPivot && text;

      if (show) {
        var left = (rootWidth - pivotWidth) * +percentage / 100;
        var style = {
          color: textColor,
          left: "".concat(left, "px"),
          background: pivotColor || background.value
        };
        return (0, _vue.createVNode)("span", {
          "ref": pivotRef,
          "style": style,
          "class": bem('pivot')
        }, [text]);
      }
    };

    (0, _vue.watch)([function () {
      return props.showPivot;
    }, function () {
      return props.pivotText;
    }], resize);
    (0, _vue.onMounted)(resize);
    (0, _useExpose.useExpose)({
      resize: resize
    });
    return function () {
      var trackColor = props.trackColor,
          percentage = props.percentage,
          strokeWidth = props.strokeWidth;
      var rootStyle = {
        background: trackColor,
        height: (0, _utils.addUnit)(strokeWidth)
      };
      var portionStyle = {
        background: background.value,
        width: state.rootWidth * +percentage / 100 + 'px'
      };
      return (0, _vue.createVNode)("div", {
        "ref": root,
        "class": bem(),
        "style": rootStyle
      }, [(0, _vue.createVNode)("span", {
        "class": bem('portion'),
        "style": portionStyle
      }, [renderPivot()])]);
    };
  }
});

exports.default = _default;