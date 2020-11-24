"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _swipe = require("../swipe");

var _utils = require("../utils");

var _use = require("@vant/use");

var _useExpose = require("../composables/use-expose");

var _createNamespace = (0, _utils.createNamespace)('swipe-item'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default = createComponent({
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var rendered;
    var state = (0, _vue.reactive)({
      offset: 0,
      inited: false,
      mounted: false
    });

    var _useParent = (0, _use.useParent)(_swipe.SWIPE_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var style = (0, _vue.computed)(function () {
      var style = {};
      var vertical = parent.props.vertical;
      style[vertical ? 'height' : 'width'] = "".concat(parent.size.value, "px");

      if (state.offset) {
        style.transform = "translate".concat(vertical ? 'Y' : 'X', "(").concat(state.offset, "px)");
      }

      return style;
    });
    var shouldRender = (0, _vue.computed)(function () {
      var _parent$props = parent.props,
          loop = _parent$props.loop,
          lazyRender = _parent$props.lazyRender;

      if (!lazyRender || rendered) {
        return true;
      } // wait for all item to mount, so we can get the exact count


      if (!state.mounted) {
        return false;
      }

      var active = parent.activeIndicator.value;
      var maxActive = parent.count.value - 1;
      var prevActive = active === 0 && loop ? maxActive : active - 1;
      var nextActive = active === maxActive && loop ? 0 : active + 1;
      rendered = index.value === active || index.value === prevActive || index.value === nextActive;
      return rendered;
    });

    var setOffset = function setOffset(offset) {
      state.offset = offset;
    };

    (0, _vue.onMounted)(function () {
      (0, _vue.nextTick)(function () {
        state.mounted = true;
      });
    });
    (0, _useExpose.useExpose)({
      setOffset: setOffset
    });
    return function () {
      var _slots$default;

      return (0, _vue.createVNode)("div", {
        "class": bem(),
        "style": style.value
      }, [shouldRender.value ? (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots) : null]);
    };
  }
});

exports.default = _default;