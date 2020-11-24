import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { ref, watch, computed, nextTick, reactive, onMounted, createVNode } from "vue";
import { createNamespace, addUnit } from '../utils';
import { useExpose } from '../composables/use-expose';

var _createNamespace = createNamespace('progress'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
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
    var root = ref();
    var pivotRef = ref();
    var state = reactive({
      rootWidth: 0,
      pivotWidth: 0
    });
    var background = computed(function () {
      return props.inactive ? '#cacaca' : props.color;
    });

    var resize = function resize() {
      nextTick(function () {
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
        return createVNode("span", {
          "ref": pivotRef,
          "style": style,
          "class": bem('pivot')
        }, [text]);
      }
    };

    watch([function () {
      return props.showPivot;
    }, function () {
      return props.pivotText;
    }], resize);
    onMounted(resize);
    useExpose({
      resize: resize
    });
    return function () {
      var trackColor = props.trackColor,
          percentage = props.percentage,
          strokeWidth = props.strokeWidth;
      var rootStyle = {
        background: trackColor,
        height: addUnit(strokeWidth)
      };
      var portionStyle = {
        background: background.value,
        width: state.rootWidth * +percentage / 100 + 'px'
      };
      return createVNode("div", {
        "ref": root,
        "class": bem(),
        "style": rootStyle
      }, [createVNode("span", {
        "class": bem('portion'),
        "style": portionStyle
      }, [renderPivot()])]);
    };
  }
});