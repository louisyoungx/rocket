import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { ref, watch, reactive, computed, onDeactivated, onBeforeUnmount, createVNode } from "vue";
// Utils
import { range, isHidden, preventDefault, createNamespace } from '../utils'; // Composition

import { useRect, doubleRaf, useChildren, useWindowSize, usePageVisibility, onMountedOrActivated } from '@vant/use';
import { useTouch } from '../composables/use-touch';
import { useExpose } from '../composables/use-expose';

var _createNamespace = createNamespace('swipe'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export var SWIPE_KEY = 'vanSwipe';
export default createComponent({
  props: {
    width: [Number, String],
    height: [Number, String],
    autoplay: [Number, String],
    vertical: Boolean,
    lazyRender: Boolean,
    indicatorColor: String,
    loop: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 500
    },
    touchable: {
      type: Boolean,
      default: true
    },
    initialSwipe: {
      type: [Number, String],
      default: 0
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    stopPropagation: {
      type: Boolean,
      default: true
    }
  },
  emits: ['change'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var root = ref();
    var state = reactive({
      rect: null,
      width: 0,
      height: 0,
      offset: 0,
      active: 0,
      swiping: false
    });
    var touch = useTouch();
    var windowSize = useWindowSize();

    var _useChildren = useChildren(SWIPE_KEY),
        children = _useChildren.children,
        linkChildren = _useChildren.linkChildren;

    var count = computed(function () {
      return children.length;
    });
    var size = computed(function () {
      return state[props.vertical ? 'height' : 'width'];
    });
    var delta = computed(function () {
      return props.vertical ? touch.deltaY.value : touch.deltaX.value;
    });
    var minOffset = computed(function () {
      return (props.vertical ? state.rect.height : state.rect.width) - size.value * count.value;
    });
    var maxCount = computed(function () {
      return Math.ceil(Math.abs(minOffset.value) / size.value);
    });
    var trackSize = computed(function () {
      return count.value * size.value;
    });
    var activeIndicator = computed(function () {
      return (state.active + count.value) % count.value;
    });
    var isCorrectDirection = computed(function () {
      var expect = props.vertical ? 'vertical' : 'horizontal';
      return touch.direction.value === expect;
    });
    var trackStyle = computed(function () {
      var _ref2;

      var mainAxis = props.vertical ? 'height' : 'width';
      var crossAxis = props.vertical ? 'width' : 'height';
      return _ref2 = {}, _defineProperty(_ref2, mainAxis, "".concat(trackSize.value, "px")), _defineProperty(_ref2, crossAxis, props[crossAxis] ? "".concat(props[crossAxis], "px") : ''), _defineProperty(_ref2, "transitionDuration", "".concat(state.swiping ? 0 : props.duration, "ms")), _defineProperty(_ref2, "transform", "translate".concat(props.vertical ? 'Y' : 'X', "(").concat(state.offset, "px)")), _ref2;
    });

    var getTargetActive = function getTargetActive(pace) {
      var active = state.active;

      if (pace) {
        if (props.loop) {
          return range(active + pace, -1, count.value);
        }

        return range(active + pace, 0, maxCount.value);
      }

      return active;
    };

    var getTargetOffset = function getTargetOffset(targetActive) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var currentPosition = targetActive * size.value;

      if (!props.loop) {
        currentPosition = Math.min(currentPosition, -minOffset.value);
      }

      var targetOffset = offset - currentPosition;

      if (!props.loop) {
        targetOffset = range(targetOffset, minOffset.value, 0);
      }

      return targetOffset;
    };

    var move = function move(_ref3) {
      var _ref3$pace = _ref3.pace,
          pace = _ref3$pace === void 0 ? 0 : _ref3$pace,
          _ref3$offset = _ref3.offset,
          offset = _ref3$offset === void 0 ? 0 : _ref3$offset,
          emitChange = _ref3.emitChange;

      if (count.value <= 1) {
        return;
      }

      var active = state.active;
      var targetActive = getTargetActive(pace);
      var targetOffset = getTargetOffset(targetActive, offset); // auto move first and last swipe in loop mode

      if (props.loop) {
        if (children[0] && targetOffset !== minOffset.value) {
          var outRightBound = targetOffset < minOffset.value;
          children[0].setOffset(outRightBound ? trackSize.value : 0);
        }

        if (children[count.value - 1] && targetOffset !== 0) {
          var outLeftBound = targetOffset > 0;
          children[count.value - 1].setOffset(outLeftBound ? -trackSize.value : 0);
        }
      }

      state.active = targetActive;
      state.offset = targetOffset;

      if (emitChange && targetActive !== active) {
        emit('change', activeIndicator.value);
      }
    };

    var correctPosition = function correctPosition() {
      state.swiping = true;

      if (state.active <= -1) {
        move({
          pace: count.value
        });
      }

      if (state.active >= count.value) {
        move({
          pace: -count.value
        });
      }
    };

    var prev = function prev() {
      correctPosition();
      touch.reset();
      doubleRaf(function () {
        state.swiping = false;
        move({
          pace: -1,
          emitChange: true
        });
      });
    };

    var next = function next() {
      correctPosition();
      touch.reset();
      doubleRaf(function () {
        state.swiping = false;
        move({
          pace: 1,
          emitChange: true
        });
      });
    };

    var autoplayTimer;

    var stopAutoplay = function stopAutoplay() {
      clearTimeout(autoplayTimer);
    };

    var autoplay = function autoplay() {
      if (props.autoplay > 0 && count.value > 1) {
        stopAutoplay();
        autoplayTimer = setTimeout(function () {
          next();
          autoplay();
        }, props.autoplay);
      }
    }; // initialize swipe position


    var initialize = function initialize() {
      var active = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : +props.initialSwipe;

      if (!root.value || isHidden(root)) {
        return;
      }

      stopAutoplay();
      var rect = useRect(root);
      state.rect = rect;
      state.swiping = true;
      state.active = active;
      state.width = +props.width || rect.width;
      state.height = +props.height || rect.height;
      state.offset = getTargetOffset(active);
      children.forEach(function (swipe) {
        swipe.setOffset(0);
      });
      autoplay();
    };

    var resize = function resize() {
      initialize(activeIndicator.value);
    };

    var touchStartTime;

    var onTouchStart = function onTouchStart(event) {
      if (!props.touchable) return;
      touch.start(event);
      touchStartTime = Date.now();
      stopAutoplay();
      correctPosition();
    };

    var onTouchMove = function onTouchMove(event) {
      if (props.touchable && state.swiping) {
        touch.move(event);

        if (isCorrectDirection.value) {
          preventDefault(event, props.stopPropagation);
          move({
            offset: delta.value
          });
        }
      }
    };

    var onTouchEnd = function onTouchEnd() {
      if (!props.touchable || !state.swiping) {
        return;
      }

      var duration = Date.now() - touchStartTime;
      var speed = delta.value / duration;
      var shouldSwipe = Math.abs(speed) > 0.25 || Math.abs(delta.value) > size.value / 2;

      if (shouldSwipe && isCorrectDirection.value) {
        var offset = props.vertical ? touch.offsetY.value : touch.offsetX.value;
        var pace = 0;

        if (props.loop) {
          pace = offset > 0 ? delta.value > 0 ? -1 : 1 : 0;
        } else {
          pace = -Math[delta.value > 0 ? 'ceil' : 'floor'](delta.value / size.value);
        }

        move({
          pace: pace,
          emitChange: true
        });
      } else if (delta.value) {
        move({
          pace: 0
        });
      }

      state.swiping = false;
      autoplay();
    };

    var swipeTo = function swipeTo(index) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      correctPosition();
      touch.reset();
      doubleRaf(function () {
        var targetIndex;

        if (props.loop && index === count.value) {
          targetIndex = state.active === 0 ? 0 : index;
        } else {
          targetIndex = index % count.value;
        }

        if (options.immediate) {
          doubleRaf(function () {
            state.swiping = false;
          });
        } else {
          state.swiping = false;
        }

        move({
          pace: targetIndex - state.active,
          emitChange: true
        });
      });
    };

    var renderDot = function renderDot(_, index) {
      var active = index === activeIndicator.value;
      var style = active ? {
        backgroundColor: props.indicatorColor
      } : null;
      return createVNode("i", {
        "style": style,
        "class": bem('indicator', {
          active: active
        })
      }, null);
    };

    var renderIndicator = function renderIndicator() {
      if (slots.indicator) {
        return slots.indicator();
      }

      if (props.showIndicators && count.value > 1) {
        return createVNode("div", {
          "class": bem('indicators', {
            vertical: props.vertical
          })
        }, [Array.apply(void 0, _toConsumableArray(Array(count.value))).map(renderDot)]);
      }
    };

    useExpose({
      prev: prev,
      next: next,
      state: state,
      resize: resize,
      swipeTo: swipeTo
    });
    linkChildren({
      size: size,
      props: props,
      count: count,
      activeIndicator: activeIndicator
    });
    watch([function () {
      return children.length;
    }, function () {
      return props.initialSwipe;
    }], function () {
      initialize();
    });
    watch(function () {
      return props.autoplay;
    }, function (value) {
      if (value > 0) {
        autoplay();
      } else {
        stopAutoplay();
      }
    });
    watch([windowSize.width, windowSize.height], resize);
    watch(usePageVisibility(), function (visible) {
      if (visible) {
        autoplay();
      } else {
        stopAutoplay();
      }
    });
    onDeactivated(stopAutoplay);
    onBeforeUnmount(stopAutoplay);
    onMountedOrActivated(initialize);
    return function () {
      var _slots$default;

      return createVNode("div", {
        "ref": root,
        "class": bem()
      }, [createVNode("div", {
        "style": trackStyle.value,
        "class": bem('track', {
          vertical: props.vertical
        }),
        "onTouchstart": onTouchStart,
        "onTouchmove": onTouchMove,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]), renderIndicator()]);
    };
  }
});