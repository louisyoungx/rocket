import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { computed, createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { createNamespace, addUnit, getSizeStyle } from '../utils';

var _createNamespace = createNamespace('loading'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var SpinIcon = [];

for (var i = 0; i < 12; i++) {
  SpinIcon.push(createVNode("i", null, null));
}

var CircularIcon = createVNode("svg", {
  "class": bem('circular'),
  "viewBox": "25 25 50 50"
}, [createVNode("circle", {
  "cx": "50",
  "cy": "50",
  "r": "20",
  "fill": "none"
}, null)]);
export default createComponent({
  props: {
    size: [Number, String],
    color: String,
    vertical: Boolean,
    textSize: [Number, String],
    type: {
      type: String,
      default: 'circular'
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var spinnerStyle = computed(function () {
      return _objectSpread({
        color: props.color
      }, getSizeStyle(props.size));
    });

    var renderText = function renderText() {
      if (slots.default) {
        return createVNode("span", {
          "class": bem('text'),
          "style": {
            fontSize: addUnit(props.textSize)
          }
        }, [slots.default()]);
      }
    };

    return function () {
      var type = props.type,
          vertical = props.vertical;
      return createVNode("div", {
        "class": bem([type, {
          vertical: vertical
        }])
      }, [createVNode("span", {
        "class": bem('spinner', type),
        "style": spinnerStyle.value
      }, [type === 'spinner' ? SpinIcon : CircularIcon]), renderText()]);
    };
  }
});