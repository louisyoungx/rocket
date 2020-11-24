import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { Transition, vShow, createVNode, withDirectives } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { noop, isDef, preventDefault, createNamespace } from '../utils';
import { useLazyRender } from '../composables/use-lazy-render';

var _createNamespace = createNamespace('overlay'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: {
    show: Boolean,
    zIndex: [Number, String],
    duration: [Number, String],
    className: null,
    customStyle: Object,
    lockScroll: {
      type: Boolean,
      default: true
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var lazyRender = useLazyRender(function () {
      return props.show;
    });

    var preventTouchMove = function preventTouchMove(event) {
      preventDefault(event, true);
    };

    var renderOverlay = lazyRender(function () {
      var _slots$default;

      var style = _objectSpread({
        zIndex: props.zIndex !== undefined ? +props.zIndex : undefined
      }, props.customStyle);

      if (isDef(props.duration)) {
        style.animationDuration = "".concat(props.duration, "s");
      }

      return withDirectives(createVNode("div", {
        "style": style,
        "class": [bem(), props.className],
        "onTouchmove": props.lockScroll ? preventTouchMove : noop
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]), [[vShow, props.show]]);
    });
    return function () {
      return createVNode(Transition, {
        "name": "van-fade"
      }, {
        default: function _default() {
          return [renderOverlay()];
        }
      });
    };
  }
});