import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { computed, getCurrentInstance, createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { TABBAR_KEY } from '../tabbar'; // Utils

import { createNamespace, isObject, isDef } from '../utils'; // Composition

import { useParent } from '@vant/use';
import { routeProps, useRoute } from '../composables/use-route'; // Components

import Icon from '../icon';
import Badge from '../badge';

var _createNamespace = createNamespace('tabbar-item'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: _objectSpread(_objectSpread({}, routeProps), {}, {
    dot: Boolean,
    icon: String,
    name: [Number, String],
    badge: [Number, String],
    iconPrefix: String
  }),
  emits: ['click'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var route = useRoute();
    var vm = getCurrentInstance().proxy;

    var _useParent = useParent(TABBAR_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var active = computed(function () {
      var _parent$props = parent.props,
          route = _parent$props.route,
          modelValue = _parent$props.modelValue;

      if (route && '$route' in vm) {
        var $route = vm.$route;
        var to = props.to;
        var config = isObject(to) ? to : {
          path: to
        };
        var pathMatched = config.path === $route.path;
        var nameMatched = isDef(config.name) && config.name === $route.name;
        return pathMatched || nameMatched;
      }

      return (props.name || index.value) === modelValue;
    });

    var onClick = function onClick(event) {
      parent.setActive(props.name || index.value);
      emit('click', event);
      route();
    };

    var renderIcon = function renderIcon() {
      if (slots.icon) {
        return slots.icon({
          active: active.value
        });
      }

      if (props.icon) {
        return createVNode(Icon, {
          "name": props.icon,
          "classPrefix": props.iconPrefix
        }, null);
      }
    };

    return function () {
      var _slots$default;

      var dot = props.dot,
          badge = props.badge;
      var _parent$props2 = parent.props,
          activeColor = _parent$props2.activeColor,
          inactiveColor = _parent$props2.inactiveColor;
      var color = active.value ? activeColor : inactiveColor;
      return createVNode("div", {
        "class": bem({
          active: active.value
        }),
        "style": {
          color: color
        },
        "onClick": onClick
      }, [createVNode(Badge, {
        "dot": dot,
        "content": badge,
        "class": bem('icon')
      }, {
        default: function _default() {
          return [renderIcon()];
        }
      }), createVNode("div", {
        "class": bem('text')
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots, {
        active: active.value
      })])]);
    };
  }
});