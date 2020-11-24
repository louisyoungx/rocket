import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { createNamespace } from '../utils';
import { ACTION_BAR_KEY } from '../action-bar'; // Composition

import { useParent } from '@vant/use';
import { useRoute, routeProps } from '../composables/use-route'; // Components

import Icon from '../icon';
import Badge from '../badge';

var _createNamespace = createNamespace('action-bar-icon'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: _objectSpread(_objectSpread({}, routeProps), {}, {
    dot: Boolean,
    text: String,
    icon: String,
    color: String,
    badge: [Number, String],
    iconClass: null
  }),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var route = useRoute();
    useParent(ACTION_BAR_KEY);

    var renderIcon = function renderIcon() {
      var dot = props.dot,
          badge = props.badge,
          icon = props.icon,
          color = props.color,
          iconClass = props.iconClass;

      if (slots.icon) {
        return createVNode(Badge, {
          "dot": dot,
          "content": badge,
          "class": bem('icon')
        }, {
          default: function _default() {
            return [slots.icon()];
          }
        });
      }

      return createVNode(Icon, {
        "tag": "div",
        "dot": dot,
        "name": icon,
        "badge": badge,
        "color": color,
        "class": [bem('icon'), iconClass]
      }, null);
    };

    return function () {
      return createVNode("div", {
        "role": "button",
        "class": bem(),
        "tabindex": 0,
        "onClick": route
      }, [renderIcon(), slots.default ? slots.default() : props.text]);
    };
  }
});