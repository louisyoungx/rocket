import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { ref, watch, computed, nextTick, resolveDirective, mergeProps, createVNode, vShow, withDirectives } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Utils
import { createNamespace } from '../utils'; // Composition

import { raf, doubleRaf, useParent } from '@vant/use';
import { useExpose } from '../composables/use-expose';
import { useLazyRender } from '../composables/use-lazy-render'; // Components

import Cell, { cellProps } from '../cell';
import { COLLAPSE_KEY } from '../collapse';

var _createNamespace = createNamespace('collapse-item'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: _objectSpread(_objectSpread({}, cellProps), {}, {
    name: [Number, String],
    disabled: Boolean,
    isLink: {
      type: Boolean,
      default: true
    }
  }),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var wrapperRef = ref();
    var contentRef = ref();

    var _useParent = useParent(COLLAPSE_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var currentName = computed(function () {
      var _props$name;

      return (_props$name = props.name) !== null && _props$name !== void 0 ? _props$name : index.value;
    });
    var expanded = computed(function () {
      if (parent) {
        return parent.isExpanded(currentName.value);
      }

      return null;
    });
    var show = ref(expanded.value);
    var lazyRender = useLazyRender(show);

    var onTransitionEnd = function onTransitionEnd() {
      if (!expanded.value) {
        show.value = false;
      } else {
        wrapperRef.value.style.height = '';
      }
    };

    watch(expanded, function (value, oldValue) {
      if (oldValue === null) {
        return;
      }

      if (value) {
        show.value = true;
      } // Use raf: flick when opened in safari
      // Use nextTick: closing animation failed when set `user-select: none`


      var tick = value ? nextTick : raf;
      tick(function () {
        if (!contentRef.value || !wrapperRef.value) {
          return;
        }

        var offsetHeight = contentRef.value.offsetHeight;

        if (offsetHeight) {
          var contentHeight = "".concat(offsetHeight, "px");
          wrapperRef.value.style.height = value ? 0 : contentHeight; // use double raf to ensure animation can start

          doubleRaf(function () {
            wrapperRef.value.style.height = value ? contentHeight : 0;
          });
        } else {
          onTransitionEnd();
        }
      });
    });

    var toggle = function toggle() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !expanded.value;
      parent.toggle(currentName.value, value);
    };

    var onClickTitle = function onClickTitle() {
      if (!props.disabled) {
        toggle();
      }
    };

    var renderTitle = function renderTitle() {
      var border = props.border,
          disabled = props.disabled;
      return createVNode(Cell, mergeProps({
        "role": "button",
        "class": bem('title', {
          disabled: disabled,
          expanded: expanded.value,
          borderless: !border
        }),
        "tabindex": disabled ? -1 : 0,
        "aria-expanded": String(expanded.value),
        "onClick": onClickTitle
      }, props), {
        icon: slots.icon,
        title: slots.title,
        default: slots.value,
        'right-icon': slots['right-icon']
      });
    };

    var renderContent = lazyRender(function () {
      var _slots$default;

      return withDirectives(createVNode("div", {
        "ref": wrapperRef,
        "class": bem('wrapper'),
        "onTransitionend": onTransitionEnd
      }, [createVNode("div", {
        "ref": contentRef,
        "class": bem('content')
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)])]), [[vShow, show.value]]);
    });
    useExpose({
      toggle: toggle
    });
    return function () {
      return createVNode("div", {
        "class": [bem({
          border: index.value && props.border
        })]
      }, [renderTitle(), renderContent()]);
    };
  }
});