import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { computed, nextTick, onMounted, reactive, createVNode } from "vue";
import { SWIPE_KEY } from '../swipe';
import { createNamespace } from '../utils';
import { useParent } from '@vant/use';
import { useExpose } from '../composables/use-expose';

var _createNamespace = createNamespace('swipe-item'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var rendered;
    var state = reactive({
      offset: 0,
      inited: false,
      mounted: false
    });

    var _useParent = useParent(SWIPE_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var style = computed(function () {
      var style = {};
      var vertical = parent.props.vertical;
      style[vertical ? 'height' : 'width'] = "".concat(parent.size.value, "px");

      if (state.offset) {
        style.transform = "translate".concat(vertical ? 'Y' : 'X', "(").concat(state.offset, "px)");
      }

      return style;
    });
    var shouldRender = computed(function () {
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

    onMounted(function () {
      nextTick(function () {
        state.mounted = true;
      });
    });
    useExpose({
      setOffset: setOffset
    });
    return function () {
      var _slots$default;

      return createVNode("div", {
        "class": bem(),
        "style": style.value
      }, [shouldRender.value ? (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots) : null]);
    };
  }
});