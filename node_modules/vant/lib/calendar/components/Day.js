"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../../utils");

var _utils2 = require("../utils");

var _createNamespace = (0, _utils.createNamespace)('calendar-day'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 1),
    createComponent = _createNamespace2[0];

var _default = createComponent({
  props: {
    item: Object,
    color: String,
    index: Number,
    offset: Number,
    rowHeight: String
  },
  emits: ['click'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var style = (0, _vue.computed)(function () {
      var item = props.item,
          index = props.index,
          color = props.color,
          offset = props.offset,
          rowHeight = props.rowHeight;
      var style = {
        height: rowHeight
      };

      if (item.type === 'placeholder') {
        style.width = '100%';
        return style;
      }

      if (index === 0) {
        style.marginLeft = "".concat(100 * offset / 7, "%");
      }

      if (color) {
        switch (item.type) {
          case 'end':
          case 'start':
          case 'start-end':
          case 'multiple-middle':
          case 'multiple-selected':
            style.background = color;
            break;

          case 'middle':
            style.color = color;
            break;
        }
      }

      return style;
    });

    var onClick = function onClick() {
      if (props.item.type !== 'disabled') {
        emit('click', props.item);
      }
    };

    var renderContent = function renderContent() {
      var item = props.item,
          color = props.color,
          rowHeight = props.rowHeight;
      var type = item.type,
          text = item.text,
          topInfo = item.topInfo,
          bottomInfo = item.bottomInfo;
      var TopInfo = topInfo && (0, _vue.createVNode)("div", {
        "class": (0, _utils2.bem)('top-info')
      }, [topInfo]);
      var BottomInfo = bottomInfo && (0, _vue.createVNode)("div", {
        "class": (0, _utils2.bem)('bottom-info')
      }, [bottomInfo]);
      var Nodes = [TopInfo, text, BottomInfo];

      if (type === 'selected') {
        return (0, _vue.createVNode)("div", {
          "class": (0, _utils2.bem)('selected-day'),
          "style": {
            width: rowHeight,
            height: rowHeight,
            background: color
          }
        }, [Nodes]);
      }

      return Nodes;
    };

    return function () {
      var _props$item = props.item,
          type = _props$item.type,
          className = _props$item.className;
      return (0, _vue.createVNode)("div", {
        "role": "gridcell",
        "style": style.value,
        "class": [(0, _utils2.bem)('day', type), className],
        "tabindex": type === 'disabled' ? null : -1,
        "onClick": onClick
      }, [renderContent()]);
    };
  }
});

exports.default = _default;