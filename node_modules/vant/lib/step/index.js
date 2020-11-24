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

var _steps = require("../steps");

var _use = require("@vant/use");

var _icon = _interopRequireDefault(require("../icon"));

var _createNamespace = (0, _utils.createNamespace)('step'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default = createComponent({
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useParent = (0, _use.useParent)(_steps.STEPS_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var getStatus = function getStatus() {
      var active = +parent.props.active;

      if (index.value < active) {
        return 'finish';
      }

      if (index.value === active) {
        return 'process';
      }
    };

    var isActive = function isActive() {
      return getStatus() === 'process';
    };

    var lineStyle = (0, _vue.computed)(function () {
      var _parent$props = parent.props,
          activeColor = _parent$props.activeColor,
          inactiveColor = _parent$props.inactiveColor;

      if (getStatus() === 'finish') {
        return {
          background: activeColor
        };
      }

      return {
        background: inactiveColor
      };
    });
    var titleStyle = (0, _vue.computed)(function () {
      var _parent$props2 = parent.props,
          activeColor = _parent$props2.activeColor,
          inactiveColor = _parent$props2.inactiveColor;

      if (isActive()) {
        return {
          color: activeColor
        };
      }

      if (!getStatus()) {
        return {
          color: inactiveColor
        };
      }
    });

    var onClickStep = function onClickStep() {
      parent.emit('click-step', index.value);
    };

    var renderCircle = function renderCircle() {
      var _parent$props3 = parent.props,
          activeIcon = _parent$props3.activeIcon,
          activeColor = _parent$props3.activeColor,
          inactiveIcon = _parent$props3.inactiveIcon;

      if (isActive()) {
        if (slots['active-icon']) {
          return slots['active-icon']();
        }

        return (0, _vue.createVNode)(_icon.default, {
          "class": bem('icon', 'active'),
          "name": activeIcon,
          "color": activeColor
        }, null);
      }

      if (slots['inactive-icon']) {
        return slots['inactive-icon']();
      }

      if (inactiveIcon) {
        return (0, _vue.createVNode)(_icon.default, {
          "class": bem('icon'),
          "name": inactiveIcon
        }, null);
      }

      return (0, _vue.createVNode)("i", {
        "class": bem('circle'),
        "style": lineStyle.value
      }, null);
    };

    return function () {
      var _slots$default;

      var direction = parent.props.direction;
      var status = getStatus();
      return (0, _vue.createVNode)("div", {
        "class": [_constant.BORDER, bem([direction, (0, _defineProperty2.default)({}, status, status)])]
      }, [(0, _vue.createVNode)("div", {
        "class": bem('title', {
          active: isActive()
        }),
        "style": titleStyle.value,
        "onClick": onClickStep
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]), (0, _vue.createVNode)("div", {
        "class": bem('circle-container'),
        "onClick": onClickStep
      }, [renderCircle()]), (0, _vue.createVNode)("div", {
        "class": bem('line'),
        "style": lineStyle.value
      }, null)]);
    };
  }
});

exports.default = _default;