"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../../utils");

var _utils2 = require("../utils");

var _createNamespace = (0, _utils.createNamespace)('calendar-header'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 1),
    createComponent = _createNamespace2[0];

var _default = createComponent({
  props: {
    title: String,
    subtitle: String,
    showTitle: Boolean,
    showSubtitle: Boolean,
    firstDayOfWeek: Number
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var renderTitle = function renderTitle() {
      if (props.showTitle) {
        var text = props.title || (0, _utils2.t)('title');
        var title = slots.title ? slots.title : text;
        return (0, _vue.createVNode)("div", {
          "class": (0, _utils2.bem)('header-title')
        }, [title]);
      }
    };

    var renderSubtitle = function renderSubtitle() {
      if (props.showSubtitle) {
        return (0, _vue.createVNode)("div", {
          "class": (0, _utils2.bem)('header-subtitle')
        }, [props.subtitle]);
      }
    };

    var renderWeekDays = function renderWeekDays() {
      var firstDayOfWeek = props.firstDayOfWeek;
      var weekdays = (0, _utils2.t)('weekdays');
      var renderWeekDays = [].concat((0, _toConsumableArray2.default)(weekdays.slice(firstDayOfWeek, 7)), (0, _toConsumableArray2.default)(weekdays.slice(0, firstDayOfWeek)));
      return (0, _vue.createVNode)("div", {
        "class": (0, _utils2.bem)('weekdays')
      }, [renderWeekDays.map(function (text) {
        return (0, _vue.createVNode)("span", {
          "class": (0, _utils2.bem)('weekday')
        }, [text]);
      })]);
    };

    return function () {
      return (0, _vue.createVNode)("div", {
        "class": (0, _utils2.bem)('header')
      }, [renderTitle(), renderSubtitle(), renderWeekDays()]);
    };
  }
});

exports.default = _default;