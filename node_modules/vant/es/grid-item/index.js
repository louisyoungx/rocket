import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { computed, createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Utils
import { createNamespace, addUnit } from '../utils';
import { BORDER } from '../utils/constant';
import { GRID_KEY } from '../grid'; // Composition

import { useParent } from '@vant/use';
import { useRoute, routeProps } from '../composables/use-route'; // Components

import Icon from '../icon';
import Badge from '../badge';

var _createNamespace = createNamespace('grid-item'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: _objectSpread(_objectSpread({}, routeProps), {}, {
    dot: Boolean,
    text: String,
    icon: String,
    badge: [Number, String],
    iconPrefix: String
  }),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useParent = useParent(GRID_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var route = useRoute();
    var rootStyle = computed(function () {
      var _parent$props = parent.props,
          square = _parent$props.square,
          gutter = _parent$props.gutter,
          columnNum = _parent$props.columnNum;
      var percent = "".concat(100 / columnNum, "%");
      var style = {
        flexBasis: percent
      };

      if (square) {
        style.paddingTop = percent;
      } else if (gutter) {
        var gutterValue = addUnit(gutter);
        style.paddingRight = gutterValue;

        if (index.value >= columnNum) {
          style.marginTop = gutterValue;
        }
      }

      return style;
    });
    var contentStyle = computed(function () {
      var _parent$props2 = parent.props,
          square = _parent$props2.square,
          gutter = _parent$props2.gutter;

      if (square && gutter) {
        var gutterValue = addUnit(gutter);
        return {
          right: gutterValue,
          bottom: gutterValue,
          height: 'auto'
        };
      }
    });

    var renderIcon = function renderIcon() {
      if (slots.icon) {
        return createVNode(Badge, {
          "dot": props.dot,
          "content": props.badge
        }, {
          default: function _default() {
            return [slots.icon()];
          }
        });
      }

      if (props.icon) {
        return createVNode(Icon, {
          "dot": props.dot,
          "name": props.icon,
          "size": parent.props.iconSize,
          "badge": props.badge,
          "class": bem('icon'),
          "classPrefix": props.iconPrefix
        }, null);
      }
    };

    var renderText = function renderText() {
      if (slots.text) {
        return slots.text();
      }

      if (props.text) {
        return createVNode("span", {
          "class": bem('text')
        }, [props.text]);
      }
    };

    var renderContent = function renderContent() {
      if (slots.default) {
        return slots.default();
      }

      return [renderIcon(), renderText()];
    };

    return function () {
      var _parent$props3 = parent.props,
          center = _parent$props3.center,
          border = _parent$props3.border,
          square = _parent$props3.square,
          gutter = _parent$props3.gutter,
          direction = _parent$props3.direction,
          clickable = _parent$props3.clickable;
      var classes = [bem('content', [direction, {
        center: center,
        square: square,
        clickable: clickable,
        surround: border && gutter
      }]), _defineProperty({}, BORDER, border)];
      return createVNode("div", {
        "class": [bem({
          square: square
        })],
        "style": rootStyle.value
      }, [createVNode("div", {
        "role": clickable ? 'button' : null,
        "class": classes,
        "style": contentStyle.value,
        "tabindex": clickable ? 0 : null,
        "onClick": route
      }, [renderContent()])]);
    };
  }
});