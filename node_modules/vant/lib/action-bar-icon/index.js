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

var _actionBar = require("../action-bar");

var _use = require("@vant/use");

var _useRoute = require("../composables/use-route");

var _icon = _interopRequireDefault(require("../icon"));

var _badge = _interopRequireDefault(require("../badge"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _createNamespace = (0, _utils.createNamespace)('action-bar-icon'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default2 = createComponent({
  props: _objectSpread(_objectSpread({}, _useRoute.routeProps), {}, {
    dot: Boolean,
    text: String,
    icon: String,
    color: String,
    badge: [Number, String],
    iconClass: null
  }),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var route = (0, _useRoute.useRoute)();
    (0, _use.useParent)(_actionBar.ACTION_BAR_KEY);

    var renderIcon = function renderIcon() {
      var dot = props.dot,
          badge = props.badge,
          icon = props.icon,
          color = props.color,
          iconClass = props.iconClass;

      if (slots.icon) {
        return (0, _vue.createVNode)(_badge.default, {
          "dot": dot,
          "content": badge,
          "class": bem('icon')
        }, {
          default: function _default() {
            return [slots.icon()];
          }
        });
      }

      return (0, _vue.createVNode)(_icon.default, {
        "tag": "div",
        "dot": dot,
        "name": icon,
        "badge": badge,
        "color": color,
        "class": [bem('icon'), iconClass]
      }, null);
    };

    return function () {
      return (0, _vue.createVNode)("div", {
        "role": "button",
        "class": bem(),
        "tabindex": 0,
        "onClick": route
      }, [renderIcon(), slots.default ? slots.default() : props.text]);
    };
  }
});

exports.default = _default2;