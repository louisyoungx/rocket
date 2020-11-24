"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _use = require("@vant/use");

var _useVisibilityChange = require("../composables/use-visibility-change");

// Utils
// Composition
var _createNamespace = (0, _utils.createNamespace)('sticky'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default = createComponent({
  props: {
    zIndex: [Number, String],
    container: null,
    offsetTop: {
      type: [Number, String],
      default: 0
    }
  },
  emits: ['scroll'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var root = (0, _vue.ref)();
    var scrollParent = (0, _use.useScrollParent)(root);
    var state = (0, _vue.reactive)({
      fixed: false,
      height: 0,
      transform: 0
    });
    var offsetTop = (0, _vue.computed)(function () {
      return (0, _utils.unitToPx)(props.offsetTop);
    });
    var style = (0, _vue.computed)(function () {
      if (!state.fixed) {
        return;
      }

      var top = offsetTop.value ? "".concat(offsetTop.value, "px") : undefined;
      var transform = state.transform ? "translate3d(0, ".concat(state.transform, "px, 0)") : undefined;
      return {
        top: top,
        zIndex: props.zIndex !== undefined ? +props.zIndex : undefined,
        transform: transform
      };
    });

    var emitScrollEvent = function emitScrollEvent(scrollTop) {
      emit('scroll', {
        scrollTop: scrollTop,
        isFixed: state.fixed
      });
    };

    var onScroll = function onScroll() {
      if (!root.value || (0, _utils.isHidden)(root)) {
        return;
      }

      state.height = root.value.offsetHeight;
      var container = props.container;
      var scrollTop = (0, _utils.getScrollTop)(window);
      var topToPageTop = (0, _utils.getElementTop)(root.value); // The sticky component should be kept inside the container element

      if (container) {
        var bottomToPageTop = topToPageTop + container.offsetHeight;

        if (scrollTop + offsetTop.value + state.height > bottomToPageTop) {
          var distanceToBottom = state.height + scrollTop - bottomToPageTop;

          if (distanceToBottom < state.height) {
            state.fixed = true;
            state.transform = -(distanceToBottom + offsetTop.value);
          } else {
            state.fixed = false;
          }

          emitScrollEvent(scrollTop);
          return;
        }
      }

      if (scrollTop + offsetTop.value > topToPageTop) {
        state.fixed = true;
        state.transform = 0;
      } else {
        state.fixed = false;
      }

      emitScrollEvent(scrollTop);
    };

    (0, _use.useEventListener)('scroll', onScroll, {
      target: scrollParent
    });
    (0, _useVisibilityChange.useVisibilityChange)(root, onScroll);
    return function () {
      var _slots$default;

      var fixed = state.fixed,
          height = state.height;
      var rootStyle = {
        height: fixed ? "".concat(height, "px") : undefined
      };
      return (0, _vue.createVNode)("div", {
        "ref": root,
        "style": rootStyle
      }, [(0, _vue.createVNode)("div", {
        "class": bem({
          fixed: fixed
        }),
        "style": style.value
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)])]);
    };
  }
});

exports.default = _default;