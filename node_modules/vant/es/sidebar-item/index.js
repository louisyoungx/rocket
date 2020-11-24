import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { createNamespace } from '../utils';
import { useParent } from '@vant/use';
import { useRoute, routeProps } from '../composables/use-route';
import { SIDEBAR_KEY } from '../sidebar';
import Badge from '../badge';

var _createNamespace = createNamespace('sidebar-item'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: _objectSpread(_objectSpread({}, routeProps), {}, {
    dot: Boolean,
    title: String,
    badge: [Number, String],
    disabled: Boolean
  }),
  emits: ['click'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var route = useRoute();

    var _useParent = useParent(SIDEBAR_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var onClick = function onClick() {
      if (props.disabled) {
        return;
      }

      emit('click', index.value);
      parent.emit('update:modelValue', index.value);
      parent.setActive(index.value);
      route();
    };

    return function () {
      var dot = props.dot,
          badge = props.badge,
          title = props.title,
          disabled = props.disabled;
      var selected = index.value === parent.active();
      return createVNode("a", {
        "class": bem({
          select: selected,
          disabled: disabled
        }),
        "onClick": onClick
      }, [createVNode(Badge, {
        "dot": dot,
        "content": badge,
        "class": bem('text')
      }, {
        default: function _default() {
          return [slots.title ? slots.title() : title];
        }
      })]);
    };
  }
});