import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { computed, createVNode } from "vue";
import { createNamespace } from '../../utils';
import { bem } from '../utils';

var _createNamespace = createNamespace('calendar-day'),
    _createNamespace2 = _slicedToArray(_createNamespace, 1),
    createComponent = _createNamespace2[0];

export default createComponent({
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
    var style = computed(function () {
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
      var TopInfo = topInfo && createVNode("div", {
        "class": bem('top-info')
      }, [topInfo]);
      var BottomInfo = bottomInfo && createVNode("div", {
        "class": bem('bottom-info')
      }, [bottomInfo]);
      var Nodes = [TopInfo, text, BottomInfo];

      if (type === 'selected') {
        return createVNode("div", {
          "class": bem('selected-day'),
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
      return createVNode("div", {
        "role": "gridcell",
        "style": style.value,
        "class": [bem('day', type), className],
        "tabindex": type === 'disabled' ? null : -1,
        "onClick": onClick
      }, [renderContent()]);
    };
  }
});