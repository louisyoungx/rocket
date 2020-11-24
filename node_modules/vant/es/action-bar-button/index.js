import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { computed, createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { createNamespace } from '../utils';
import { ACTION_BAR_KEY } from '../action-bar'; // Composition

import { useParent } from '@vant/use';
import { useExpose } from '../composables/use-expose';
import { useRoute, routeProps } from '../composables/use-route'; // Components

import Button from '../button';

var _createNamespace = createNamespace('action-bar-button'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: _objectSpread(_objectSpread({}, routeProps), {}, {
    type: String,
    text: String,
    icon: String,
    color: String,
    loading: Boolean,
    disabled: Boolean
  }),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var route = useRoute();

    var _useParent = useParent(ACTION_BAR_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var isFirst = computed(function () {
      if (parent) {
        var prev = parent.children[index.value - 1];
        return !(prev && 'isButton' in prev);
      }
    });
    var isLast = computed(function () {
      if (parent) {
        var next = parent.children[index.value + 1];
        return !(next && 'isButton' in next);
      }
    });
    useExpose({
      isButton: true
    });
    return function () {
      var type = props.type,
          icon = props.icon,
          text = props.text,
          color = props.color,
          loading = props.loading,
          disabled = props.disabled;
      return createVNode(Button, {
        "class": bem([type, {
          last: isLast.value,
          first: isFirst.value
        }]),
        "size": "large",
        "type": type,
        "icon": icon,
        "color": color,
        "loading": loading,
        "disabled": disabled,
        "onClick": route
      }, {
        default: function _default() {
          return [slots.default ? slots.default() : text];
        }
      });
    };
  }
});