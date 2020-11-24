"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _constant = require("../utils/constant");

var _grid = require("../grid");

var _use = require("@vant/use");

var _useRoute = require("../composables/use-route");

var _icon = _interopRequireDefault(require("../icon"));

var _badge = _interopRequireDefault(require("../badge"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _createNamespace = (0, _utils.createNamespace)('grid-item'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default2 = createComponent({
  props: _objectSpread(_objectSpread({}, _useRoute.routeProps), {}, {
    dot: Boolean,
    text: String,
    icon: String,
    badge: [Number, String],
    iconPrefix: String
  }),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useParent = (0, _use.useParent)(_grid.GRID_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var route = (0, _useRoute.useRoute)();
    var rootStyle = (0, _vue.computed)(function () {
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
        var gutterValue = (0, _utils.addUnit)(gutter);
        style.paddingRight = gutterValue;

        if (index.value >= columnNum) {
          style.marginTop = gutterValue;
        }
      }

      return style;
    });
    var contentStyle = (0, _vue.computed)(function () {
      var _parent$props2 = parent.props,
          square = _parent$props2.square,
          gutter = _parent$props2.gutter;

      if (square && gutter) {
        var gutterValue = (0, _utils.addUnit)(gutter);
        return {
          right: gutterValue,
          bottom: gutterValue,
          height: 'auto'
        };
      }
    });

    var renderIcon = function renderIcon() {
      if (slots.icon) {
        return (0, _vue.createVNode)(_badge.default, {
          "dot": props.dot,
          "content": props.badge
        }, {
          default: function _default() {
            return [slots.icon()];
          }
        });
      }

      if (props.icon) {
        return (0, _vue.createVNode)(_icon.default, {
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
        return (0, _vue.createVNode)("span", {
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
      }]), (0, _defineProperty2.default)({}, _constant.BORDER, border)];
      return (0, _vue.createVNode)("div", {
        "class": [bem({
          square: square
        })],
        "style": rootStyle.value
      }, [(0, _vue.createVNode)("div", {
        "role": clickable ? 'button' : null,
        "class": classes,
        "style": contentStyle.value,
        "tabindex": clickable ? 0 : null,
        "onClick": route
      }, [renderContent()])]);
    };
  }
});

exports.default = _default2;