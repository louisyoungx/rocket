import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { watch, computed, createVNode } from "vue";
import { raf, cancelRaf } from '@vant/use';
import { isObject, getSizeStyle, createNamespace } from '../utils';
import { BLUE, WHITE } from '../utils/constant';

var _createNamespace = createNamespace('circle'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var uid = 0;

function format(rate) {
  return Math.min(Math.max(+rate, 0), 100);
}

function getPath(clockwise, viewBoxSize) {
  var sweepFlag = clockwise ? 1 : 0;
  return "M ".concat(viewBoxSize / 2, " ").concat(viewBoxSize / 2, " m 0, -500 a 500, 500 0 1, ").concat(sweepFlag, " 0, 1000 a 500, 500 0 1, ").concat(sweepFlag, " 0, -1000");
}

export default createComponent({
  props: {
    text: String,
    strokeLinecap: String,
    currentRate: {
      type: Number,
      default: 0
    },
    speed: {
      type: [Number, String],
      default: 0
    },
    size: {
      type: [Number, String],
      default: 100
    },
    fill: {
      type: String,
      default: 'none'
    },
    rate: {
      type: [Number, String],
      default: 100
    },
    layerColor: {
      type: String,
      default: WHITE
    },
    color: {
      type: [String, Object],
      default: BLUE
    },
    strokeWidth: {
      type: [Number, String],
      default: 40
    },
    clockwise: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:currentRate'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var id = "van-circle-".concat(uid++);
    var viewBoxSize = computed(function () {
      return +props.strokeWidth + 1000;
    });
    var path = computed(function () {
      return getPath(props.clockwise, viewBoxSize.value);
    });
    watch(function () {
      return props.rate;
    }, function (rate) {
      var rafId;
      var startTime = Date.now();
      var startRate = props.currentRate;
      var endRate = format(rate);
      var duration = Math.abs((startRate - endRate) * 1000 / +props.speed);

      var animate = function animate() {
        var now = Date.now();
        var progress = Math.min((now - startTime) / duration, 1);
        var rate = progress * (endRate - startRate) + startRate;
        emit('update:currentRate', format(parseFloat(rate.toFixed(1))));

        if (endRate > startRate ? rate < endRate : rate > endRate) {
          rafId = raf(animate);
        }
      };

      if (props.speed) {
        if (rafId) {
          cancelRaf(rafId);
        }

        rafId = raf(animate);
      } else {
        emit('update:currentRate', endRate);
      }
    }, {
      immediate: true
    });

    var renderHover = function renderHover() {
      var style = {
        fill: props.fill,
        stroke: props.layerColor,
        strokeWidth: "".concat(props.strokeWidth, "px")
      };
      return createVNode("path", {
        "class": bem('hover'),
        "style": style,
        "d": path.value
      }, null);
    };

    var renderLayer = function renderLayer() {
      var PERIMETER = 3140;
      var color = props.color,
          strokeWidth = props.strokeWidth,
          currentRate = props.currentRate,
          strokeLinecap = props.strokeLinecap;
      var offset = PERIMETER * currentRate / 100;
      var style = {
        stroke: "".concat(color),
        strokeWidth: "".concat(+strokeWidth + 1, "px"),
        strokeLinecap: strokeLinecap,
        strokeDasharray: "".concat(offset, "px ").concat(PERIMETER, "px")
      };
      return createVNode("path", {
        "d": path.value,
        "style": style,
        "class": bem('layer'),
        "stroke": isObject(color) ? "url(#".concat(id, ")") : color
      }, null);
    };

    var renderGradient = function renderGradient() {
      var color = props.color;

      if (!isObject(color)) {
        return;
      }

      var Stops = Object.keys(color).sort(function (a, b) {
        return parseFloat(a) - parseFloat(b);
      }).map(function (key, index) {
        return createVNode("stop", {
          "key": index,
          "offset": key,
          "stop-color": color[key]
        }, null);
      });
      return createVNode("defs", null, [createVNode("linearGradient", {
        "id": id,
        "x1": "100%",
        "y1": "0%",
        "x2": "0%",
        "y2": "0%"
      }, [Stops])]);
    };

    var renderText = function renderText() {
      if (slots.default) {
        return slots.default();
      }

      if (props.text) {
        return createVNode("div", {
          "class": bem('text')
        }, [props.text]);
      }
    };

    return function () {
      return createVNode("div", {
        "class": bem(),
        "style": getSizeStyle(props.size)
      }, [createVNode("svg", {
        "viewBox": "0 0 ".concat(viewBoxSize.value, " ").concat(viewBoxSize.value)
      }, [renderGradient(), renderHover(), renderLayer()]), renderText()]);
    };
  }
});