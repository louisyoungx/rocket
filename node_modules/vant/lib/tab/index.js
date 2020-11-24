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

var _tabs = require("../tabs");

var _use = require("@vant/use");

var _useRoute = require("../composables/use-route");

var _swipeItem = _interopRequireDefault(require("../swipe-item"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _createNamespace = (0, _utils.createNamespace)('tab'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default2 = createComponent({
  props: _objectSpread(_objectSpread({}, _useRoute.routeProps), {}, {
    dot: Boolean,
    name: [Number, String],
    badge: [Number, String],
    title: String,
    titleStyle: null,
    disabled: Boolean
  }),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var inited = (0, _vue.ref)(false);

    var _useParent = (0, _use.useParent)(_tabs.TABS_KEY),
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
        (0, _vue.nextTick)(function () {
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

    (0, _vue.watch)(function () {
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

        return (0, _vue.createVNode)(_swipeItem.default, {
          "role": "tabpanel",
          "aria-hidden": !active,
          "class": bem('pane-wrapper', {
            inactive: !active
          })
        }, {
          default: function _default() {
            return [(0, _vue.createVNode)("div", {
              "class": bem('pane')
            }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)])];
          }
        });
      }

      var shouldRender = inited.value || scrollspy || !lazyRender;
      var Content = shouldRender ? (_slots$default2 = slots.default) === null || _slots$default2 === void 0 ? void 0 : _slots$default2.call(slots) : null;
      return (0, _vue.withDirectives)((0, _vue.createVNode)("div", {
        "role": "tabpanel",
        "class": bem('pane')
      }, [Content]), [[_vue.vShow, show]]);
    };
  }
});

exports.default = _default2;