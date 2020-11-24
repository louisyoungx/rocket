import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { ref, watch, nextTick, createVNode, vShow, withDirectives } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { createNamespace } from '../utils';
import { TABS_KEY } from '../tabs'; // Composition

import { useParent } from '@vant/use';
import { routeProps } from '../composables/use-route'; // Components

import SwipeItem from '../swipe-item';

var _createNamespace = createNamespace('tab'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: _objectSpread(_objectSpread({}, routeProps), {}, {
    dot: Boolean,
    name: [Number, String],
    badge: [Number, String],
    title: String,
    titleStyle: null,
    disabled: Boolean
  }),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var inited = ref(false);

    var _useParent = useParent(TABS_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    if (!parent) {
      throw new Error('[Vant] Tabs: <van-tab> must be used inside <van-tabs>');
    }

    var getName = function getName() {
      var _props$name;

      return (_props$name = props.name) !== null && _props$name !== void 0 ? _props$name : index.value;
    };

    var init = function init() {
      inited.value = true;

      if (parent.props.lazyRender) {
        nextTick(function () {
          parent.emit('rendered', getName(), props.title);
        });
      }
    };

    var isActive = function isActive() {
      var active = getName() === parent.currentName.value;

      if (active && !inited.value) {
        init();
      }

      return active;
    };

    watch(function () {
      return props.title;
    }, function () {
      parent.setLine();
    });
    return function () {
      var _slots$default2;

      var _parent$props = parent.props,
          animated = _parent$props.animated,
          swipeable = _parent$props.swipeable,
          scrollspy = _parent$props.scrollspy,
          lazyRender = _parent$props.lazyRender;

      if (!slots.default && !animated) {
        return;
      }

      var active = isActive();
      var show = scrollspy || active;

      if (animated || swipeable) {
        var _slots$default;

        return createVNode(SwipeItem, {
          "role": "tabpanel",
          "aria-hidden": !active,
          "class": bem('pane-wrapper', {
            inactive: !active
          })
        }, {
          default: function _default() {
            return [createVNode("div", {
              "class": bem('pane')
            }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)])];
          }
        });
      }

      var shouldRender = inited.value || scrollspy || !lazyRender;
      var Content = shouldRender ? (_slots$default2 = slots.default) === null || _slots$default2 === void 0 ? void 0 : _slots$default2.call(slots) : null;
      return withDirectives(createVNode("div", {
        "role": "tabpanel",
        "class": bem('pane')
      }, [Content]), [[vShow, show]]);
    };
  }
});