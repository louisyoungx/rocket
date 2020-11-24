"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _tabbar = require("../tabbar");

var _utils = require("../utils");

var _use = require("@vant/use");

var _useRoute = require("../composables/use-route");

var _icon = _interopRequireDefault(require("../icon"));

var _badge = _interopRequireDefault(require("../badge"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _createNamespace = (0, _utils.createNamespace)('tabbar-item'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default2 = createComponent({
  props: _objectSpread(_objectSpread({}, _useRoute.routeProps), {}, {
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
    var route = (0, _useRoute.useRoute)();
    var vm = (0, _vue.getCurrentInstance)().proxy;

    var _useParent = (0, _use.useParent)(_tabbar.TABBAR_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var active = (0, _vue.computed)(function () {
      var _parent$props = parent.props,
          route = _parent$props.route,
          modelValue = _parent$props.modelValue;

      if (route && '$route' in vm) {
        var $route = vm.$route;
        var to = props.to;
        var config = (0, _utils.isObject)(to) ? to : {
          path: to
        };
        var pathMatched = config.path === $route.path;
        var nameMatched = (0, _utils.isDef)(config.name) && config.name === $route.name;
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
        return (0, _vue.createVNode)(_icon.default, {
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
      return (0, _vue.createVNode)("div", {
        "class": bem({
          active: active.value
        }),
        "style": {
          color: color
        },
        "onClick": onClick
      }, [(0, _vue.createVNode)(_badge.default, {
        "dot": dot,
        "content": badge,
        "class": bem('icon')
      }, {
        default: function _default() {
          return [renderIcon()];
        }
      }), (0, _vue.createVNode)("div", {
        "class": bem('text')
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots, {
        active: active.value
      })])]);
    };
  }
});

exports.default = _default2;