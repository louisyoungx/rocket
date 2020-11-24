import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { ref, reactive, computed, createVNode } from "vue";
// Utils
import { isHidden, unitToPx, getScrollTop, getElementTop, createNamespace } from '../utils'; // Composition

import { useScrollParent, useEventListener } from '@vant/use';
import { useVisibilityChange } from '../composables/use-visibility-change';

var _createNamespace = createNamespace('sticky'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
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
    var root = ref();
    var scrollParent = useScrollParent(root);
    var state = reactive({
      fixed: false,
      height: 0,
      transform: 0
    });
    var offsetTop = computed(function () {
      return unitToPx(props.offsetTop);
    });
    var style = computed(function () {
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
      if (!root.value || isHidden(root)) {
        return;
      }

      state.height = root.value.offsetHeight;
      var container = props.container;
      var scrollTop = getScrollTop(window);
      var topToPageTop = getElementTop(root.value); // The sticky component should be kept inside the container element

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

    useEventListener('scroll', onScroll, {
      target: scrollParent
    });
    useVisibilityChange(root, onScroll);
    return function () {
      var _slots$default;

      var fixed = state.fixed,
          height = state.height;
      var rootStyle = {
        height: fixed ? "".concat(height, "px") : undefined
      };
      return createVNode("div", {
        "ref": root,
        "style": rootStyle
      }, [createVNode("div", {
        "class": bem({
          fixed: fixed
        }),
        "style": style.value
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)])]);
    };
  }
});