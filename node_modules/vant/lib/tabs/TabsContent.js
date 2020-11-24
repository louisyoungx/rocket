"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _swipe = _interopRequireDefault(require("../swipe"));

var _createNamespace = (0, _utils.createNamespace)('tabs'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default2 = createComponent({
  props: {
    inited: Boolean,
    animated: Boolean,
    swipeable: Boolean,
    lazyRender: Boolean,
    count: {
      type: Number,
      required: true
    },
    duration: {
      type: [Number, String],
      required: true
    },
    currentIndex: {
      type: Number,
      required: true
    }
  },
  emits: ['change'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var swipeRef = (0, _vue.ref)();

    var onChange = function onChange(index) {
      emit('change', index);
    };

    var renderChildren = function renderChildren() {
      var _slots$default;

      var Content = (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots);

      if (props.animated || props.swipeable) {
        return (0, _vue.createVNode)(_swipe.default, {
          "ref": swipeRef,
          "loop": false,
          "class": bem('track'),
          "duration": +props.duration * 1000,
          "touchable": props.swipeable,
          "lazyRender": props.lazyRender,
          "showIndicators": false,
          "onChange": onChange
        }, {
          default: function _default() {
            return [Content];
          }
        });
      }

      return Content;
    };

    var swipeToCurrentTab = function swipeToCurrentTab(index) {
      var swipe = swipeRef.value;

      if (swipe && swipe.state.active !== index) {
        swipe.swipeTo(index, {
          immediate: !props.inited
        });
      }
    };

    (0, _vue.watch)(function () {
      return props.currentIndex;
    }, swipeToCurrentTab);
    (0, _vue.onMounted)(function () {
      swipeToCurrentTab(props.currentIndex);
    });
    return function () {
      return (0, _vue.createVNode)("div", {
        "class": bem('content', {
          animated: props.animated || props.swipeable
        })
      }, [renderChildren()]);
    };
  }
});

exports.default = _default2;