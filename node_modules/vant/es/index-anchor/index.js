import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { ref, reactive, computed, onMounted, createVNode } from "vue";
// Utils
import { createNamespace } from '../utils';
import { BORDER_BOTTOM } from '../utils/constant';
import { INDEX_BAR_KEY } from '../index-bar';
import { getScrollTop, getRootScrollTop } from '../utils/dom/scroll'; // Composition

import { useRect, useParent } from '@vant/use';
import { useHeight } from '../composables/use-height';
import { useExpose } from '../composables/use-expose';

var _createNamespace = createNamespace('index-anchor'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: {
    index: [Number, String]
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var state = reactive({
      top: 0,
      left: null,
      rect: {
        top: 0,
        height: 0
      },
      width: null,
      active: false
    });
    var root = ref();

    var _useParent = useParent(INDEX_BAR_KEY),
        parent = _useParent.parent;

    var isSticky = function isSticky() {
      return state.active && parent.props.sticky;
    };

    var anchorStyle = computed(function () {
      var _parent$props = parent.props,
          zIndex = _parent$props.zIndex,
          highlightColor = _parent$props.highlightColor;

      if (isSticky()) {
        return {
          zIndex: "".concat(zIndex),
          left: state.left ? "".concat(state.left, "px") : null,
          width: state.width ? "".concat(state.width, "px") : null,
          transform: state.top ? "translate3d(0, ".concat(state.top, "px, 0)") : null,
          color: highlightColor
        };
      }
    });

    var getRect = function getRect(scrollParent, scrollParentRect) {
      var rootRect = useRect(root);
      state.rect.height = rootRect.height;

      if (scrollParent === window || scrollParent === document.body) {
        state.rect.top = rootRect.top + getRootScrollTop();
      } else {
        state.rect.top = rootRect.top + getScrollTop(scrollParent) - scrollParentRect.top;
      }

      return state.rect;
    };

    onMounted(function () {
      state.rect.height = useHeight(root);
    });
    useExpose({
      state: state,
      getRect: getRect
    });
    return function () {
      var sticky = isSticky();
      return createVNode("div", {
        "ref": root,
        "style": {
          height: sticky ? "".concat(state.rect.height, "px") : null
        }
      }, [createVNode("div", {
        "style": anchorStyle.value,
        "class": [bem({
          sticky: sticky
        }), _defineProperty({}, BORDER_BOTTOM, sticky)]
      }, [slots.default ? slots.default() : props.index])]);
    };
  }
});