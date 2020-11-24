import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { ref, watch, onMounted, createVNode } from "vue";
import { createNamespace } from '../utils';
import Swipe from '../swipe';

var _createNamespace = createNamespace('tabs'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
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
    var swipeRef = ref();

    var onChange = function onChange(index) {
      emit('change', index);
    };

    var renderChildren = function renderChildren() {
      var _slots$default;

      var Content = (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots);

      if (props.animated || props.swipeable) {
        return createVNode(Swipe, {
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

    watch(function () {
      return props.currentIndex;
    }, swipeToCurrentTab);
    onMounted(function () {
      swipeToCurrentTab(props.currentIndex);
    });
    return function () {
      return createVNode("div", {
        "class": bem('content', {
          animated: props.animated || props.swipeable
        })
      }, [renderChildren()]);
    };
  }
});