import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { ref, createVNode } from "vue";
// Utils
import { createNamespace, isDef } from '../utils';
import { BORDER_TOP_BOTTOM } from '../utils/constant';
import { callInterceptor } from '../utils/interceptor'; // Composition

import { useChildren } from '@vant/use';
import { usePlaceholder } from '../composables/use-placeholder';

var _createNamespace = createNamespace('tabbar'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export var TABBAR_KEY = 'vanTabbar';
export default createComponent({
  props: {
    route: Boolean,
    zIndex: [Number, String],
    placeholder: Boolean,
    activeColor: String,
    beforeChange: Function,
    inactiveColor: String,
    modelValue: {
      type: [Number, String],
      default: 0
    },
    border: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: null
    }
  },
  emits: ['change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var root = ref();

    var _useChildren = useChildren(TABBAR_KEY),
        linkChildren = _useChildren.linkChildren;

    var renderPlaceholder = usePlaceholder(root, bem);

    var isUnfit = function isUnfit() {
      if (isDef(props.safeAreaInsetBottom)) {
        return !props.safeAreaInsetBottom;
      } // enable safe-area-inset-bottom by default when fixed


      return !props.fixed;
    };

    var renderTabbar = function renderTabbar() {
      var _slots$default;

      var fixed = props.fixed,
          zIndex = props.zIndex,
          border = props.border;
      var unfit = isUnfit();
      return createVNode("div", {
        "ref": root,
        "style": {
          zIndex: zIndex
        },
        "class": [bem({
          unfit: unfit,
          fixed: fixed
        }), _defineProperty({}, BORDER_TOP_BOTTOM, border)]
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);
    };

    var setActive = function setActive(active) {
      if (active !== props.modelValue) {
        callInterceptor({
          interceptor: props.beforeChange,
          args: [active],
          done: function done() {
            emit('update:modelValue', active);
            emit('change', active);
          }
        });
      }
    };

    linkChildren({
      props: props,
      setActive: setActive
    });
    return function () {
      if (props.fixed && props.placeholder) {
        return renderPlaceholder(renderTabbar);
      }

      return renderTabbar();
    };
  }
});