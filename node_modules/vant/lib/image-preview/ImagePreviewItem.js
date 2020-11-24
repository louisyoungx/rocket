"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _shared = require("./shared");

var _utils = require("../utils");

var _useTouch = require("../composables/use-touch");

var _image = _interopRequireDefault(require("../image"));

var _loading = _interopRequireDefault(require("../loading"));

var _swipeItem = _interopRequireDefault(require("../swipe-item"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function getDistance(touches) {
  return Math.sqrt(Math.pow(touches[0].clientX - touches[1].clientX, 2) + Math.pow(touches[0].clientY - touches[1].clientY, 2));
}

var _default2 = {
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
    var state = (0, _vue.reactive)({
      scale: 1,
      moveX: 0,
      moveY: 0,
      moving: false,
      zooming: false,
      imageRatio: 0,
      displayWidth: 0,
      displayHeight: 0
    });
    var touch = (0, _useTouch.useTouch)();
    var vertical = (0, _vue.computed)(function () {
      var rootWidth = props.rootWidth,
          rootHeight = props.rootHeight;
      var rootRatio = rootHeight / rootWidth;
      return state.imageRatio > rootRatio;
    });
    var imageStyle = (0, _vue.computed)(function () {
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
    var maxMoveX = (0, _vue.computed)(function () {
      if (state.imageRatio) {
        var rootWidth = props.rootWidth,
            rootHeight = props.rootHeight;
        var displayWidth = vertical.value ? rootHeight / state.imageRatio : rootWidth;
        return Math.max(0, (state.scale * displayWidth - rootWidth) / 2);
      }

      return 0;
    });
    var maxMoveY = (0, _vue.computed)(function () {
      if (state.imageRatio) {
        var rootWidth = props.rootWidth,
            rootHeight = props.rootHeight;
        var displayHeight = vertical.value ? rootHeight : rootWidth * state.imageRatio;
        return Math.max(0, (state.scale * displayHeight - rootHeight) / 2);
      }

      return 0;
    });

    var setScale = function setScale(scale) {
      state.scale = (0, _utils.range)(scale, +props.minZoom, +props.maxZoom);
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
        (0, _utils.preventDefault)(event, true);
      }

      if (state.moving) {
        var deltaX = touch.deltaX,
            deltaY = touch.deltaY;
        var moveX = deltaX.value + startMoveX;
        var moveY = deltaY.value + startMoveY;
        state.moveX = (0, _utils.range)(moveX, -maxMoveX.value, maxMoveX.value);
        state.moveY = (0, _utils.range)(moveY, -maxMoveY.value, maxMoveY.value);
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
            state.moveX = (0, _utils.range)(state.moveX, -maxMoveX.value, maxMoveX.value);
            state.moveY = (0, _utils.range)(state.moveY, -maxMoveY.value, maxMoveY.value);
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


      (0, _utils.preventDefault)(event, stopPropagation);
      checkTap();
      touch.reset();
    };

    var onLoad = function onLoad(event) {
      var _event$target = event.target,
          naturalWidth = _event$target.naturalWidth,
          naturalHeight = _event$target.naturalHeight;
      state.imageRatio = naturalHeight / naturalWidth;
    };

    (0, _vue.watch)(function () {
      return props.show;
    }, function (value) {
      if (!value) {
        resetScale();
      }
    });
    return function () {
      var imageSlots = {
        loading: function loading() {
          return (0, _vue.createVNode)(_loading.default, {
            "type": "spinner"
          }, null);
        }
      };
      return (0, _vue.createVNode)(_swipeItem.default, {
        "class": (0, _shared.bem)('swipe-item'),
        "onTouchstart": onTouchStart,
        "onTouchmove": onTouchMove,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, {
        default: function _default() {
          return [(0, _vue.createVNode)(_image.default, {
            "src": props.src,
            "fit": "contain",
            "class": (0, _shared.bem)('image', {
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
exports.default = _default2;