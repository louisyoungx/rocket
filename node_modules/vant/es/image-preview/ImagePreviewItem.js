import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { watch, computed, reactive, createVNode, resolveDirective } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Utils
import { bem } from './shared';
import { range, preventDefault } from '../utils'; // Composition

import { useTouch } from '../composables/use-touch'; // Component

import Image from '../image';
import Loading from '../loading';
import SwipeItem from '../swipe-item';

function getDistance(touches) {
  return Math.sqrt(Math.pow(touches[0].clientX - touches[1].clientX, 2) + Math.pow(touches[0].clientY - touches[1].clientY, 2));
}

export default {
  props: {
    src: String,
    show: Boolean,
    active: Number,
    minZoom: [Number, String],
    maxZoom: [Number, String],
    rootWidth: Number,
    rootHeight: Number
  },
  emits: ['scale', 'close'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var state = reactive({
      scale: 1,
      moveX: 0,
      moveY: 0,
      moving: false,
      zooming: false,
      imageRatio: 0,
      displayWidth: 0,
      displayHeight: 0
    });
    var touch = useTouch();
    var vertical = computed(function () {
      var rootWidth = props.rootWidth,
          rootHeight = props.rootHeight;
      var rootRatio = rootHeight / rootWidth;
      return state.imageRatio > rootRatio;
    });
    var imageStyle = computed(function () {
      var scale = state.scale,
          moveX = state.moveX,
          moveY = state.moveY,
          moving = state.moving,
          zooming = state.zooming;
      var style = {
        transitionDuration: zooming || moving ? '0s' : '.3s'
      };

      if (scale !== 1) {
        var offsetX = moveX / scale;
        var offsetY = moveY / scale;
        style.transform = "scale(".concat(scale, ", ").concat(scale, ") translate(").concat(offsetX, "px, ").concat(offsetY, "px)");
      }

      return style;
    });
    var maxMoveX = computed(function () {
      if (state.imageRatio) {
        var rootWidth = props.rootWidth,
            rootHeight = props.rootHeight;
        var displayWidth = vertical.value ? rootHeight / state.imageRatio : rootWidth;
        return Math.max(0, (state.scale * displayWidth - rootWidth) / 2);
      }

      return 0;
    });
    var maxMoveY = computed(function () {
      if (state.imageRatio) {
        var rootWidth = props.rootWidth,
            rootHeight = props.rootHeight;
        var displayHeight = vertical.value ? rootHeight : rootWidth * state.imageRatio;
        return Math.max(0, (state.scale * displayHeight - rootHeight) / 2);
      }

      return 0;
    });

    var setScale = function setScale(scale) {
      state.scale = range(scale, +props.minZoom, +props.maxZoom);
      emit('scale', {
        scale: state.scale,
        index: state.active
      });
    };

    var resetScale = function resetScale() {
      setScale(1);
      state.moveX = 0;
      state.moveY = 0;
    };

    var toggleScale = function toggleScale() {
      var scale = state.scale > 1 ? 1 : 2;
      setScale(scale);
      state.moveX = 0;
      state.moveY = 0;
    };

    var startMoveX;
    var startMoveY;
    var startScale;
    var startDistance;
    var doubleTapTimer;
    var touchStartTime;

    var onTouchStart = function onTouchStart(event) {
      var touches = event.touches;
      var offsetX = touch.offsetX;
      touch.start(event);
      startMoveX = state.moveX;
      startMoveY = state.moveY;
      touchStartTime = new Date();
      state.moving = touches.length === 1 && state.scale !== 1;
      state.zooming = touches.length === 2 && !offsetX.value;

      if (state.zooming) {
        startScale = state.scale;
        startDistance = getDistance(event.touches);
      }
    };

    var onTouchMove = function onTouchMove(event) {
      var touches = event.touches;
      touch.move(event);

      if (state.moving || state.zooming) {
        preventDefault(event, true);
      }

      if (state.moving) {
        var deltaX = touch.deltaX,
            deltaY = touch.deltaY;
        var moveX = deltaX.value + startMoveX;
        var moveY = deltaY.value + startMoveY;
        state.moveX = range(moveX, -maxMoveX.value, maxMoveX.value);
        state.moveY = range(moveY, -maxMoveY.value, maxMoveY.value);
      }

      if (state.zooming && touches.length === 2) {
        var distance = getDistance(touches);
        var scale = startScale * distance / startDistance;
        setScale(scale);
      }
    };

    var checkTap = function checkTap() {
      var offsetX = touch.offsetX,
          offsetY = touch.offsetY;
      var deltaTime = new Date() - touchStartTime;
      var TAP_TIME = 250;
      var TAP_OFFSET = 10;

      if (offsetX.value < TAP_OFFSET && offsetY.value < TAP_OFFSET && deltaTime < TAP_TIME) {
        if (doubleTapTimer) {
          clearTimeout(doubleTapTimer);
          doubleTapTimer = null;
          toggleScale();
        } else {
          doubleTapTimer = setTimeout(function () {
            emit('close');
            doubleTapTimer = null;
          }, TAP_TIME);
        }
      }
    };

    var onTouchEnd = function onTouchEnd(event) {
      var stopPropagation = false;
      /* istanbul ignore else */

      if (state.moving || state.zooming) {
        stopPropagation = true;

        if (state.moving && startMoveX === state.moveX && startMoveY === state.moveY) {
          stopPropagation = false;
        }

        if (!event.touches.length) {
          if (state.zooming) {
            state.moveX = range(state.moveX, -maxMoveX.value, maxMoveX.value);
            state.moveY = range(state.moveY, -maxMoveY.value, maxMoveY.value);
            state.zooming = false;
          }

          state.moving = false;
          startMoveX = 0;
          startMoveY = 0;
          startScale = 1;

          if (state.scale < 1) {
            resetScale();
          }
        }
      } // eliminate tap delay on safari


      preventDefault(event, stopPropagation);
      checkTap();
      touch.reset();
    };

    var onLoad = function onLoad(event) {
      var _event$target = event.target,
          naturalWidth = _event$target.naturalWidth,
          naturalHeight = _event$target.naturalHeight;
      state.imageRatio = naturalHeight / naturalWidth;
    };

    watch(function () {
      return props.show;
    }, function (value) {
      if (!value) {
        resetScale();
      }
    });
    return function () {
      var imageSlots = {
        loading: function loading() {
          return createVNode(Loading, {
            "type": "spinner"
          }, null);
        }
      };
      return createVNode(SwipeItem, {
        "class": bem('swipe-item'),
        "onTouchstart": onTouchStart,
        "onTouchmove": onTouchMove,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, {
        default: function _default() {
          return [createVNode(Image, {
            "src": props.src,
            "fit": "contain",
            "class": bem('image', {
              vertical: vertical.value
            }),
            "style": imageStyle.value,
            "onLoad": onLoad
          }, _objectSpread({}, imageSlots))];
        }
      });
    };
  }
};