import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createVNode } from "vue";
import { createNamespace } from '../../utils';
import { t, bem } from '../utils';

var _createNamespace = createNamespace('calendar-header'),
    _createNamespace2 = _slicedToArray(_createNamespace, 1),
    createComponent = _createNamespace2[0];

export default createComponent({
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
        var text = props.title || t('title');
        var title = slots.title ? slots.title : text;
        return createVNode("div", {
          "class": bem('header-title')
        }, [title]);
      }
    };

    var renderSubtitle = function renderSubtitle() {
      if (props.showSubtitle) {
        return createVNode("div", {
          "class": bem('header-subtitle')
        }, [props.subtitle]);
      }
    };

    var renderWeekDays = function renderWeekDays() {
      var firstDayOfWeek = props.firstDayOfWeek;
      var weekdays = t('weekdays');
      var renderWeekDays = [].concat(_toConsumableArray(weekdays.slice(firstDayOfWeek, 7)), _toConsumableArray(weekdays.slice(0, firstDayOfWeek)));
      return createVNode("div", {
        "class": bem('weekdays')
      }, [renderWeekDays.map(function (text) {
        return createVNode("span", {
          "class": bem('weekday')
        }, [text]);
      })]);
    };

    return function () {
      return createVNode("div", {
        "class": bem('header')
      }, [renderTitle(), renderSubtitle(), renderWeekDays()]);
    };
  }
});