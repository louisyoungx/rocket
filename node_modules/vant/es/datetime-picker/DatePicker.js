import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { ref, watch, computed, nextTick, onMounted, mergeProps, createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Utils
import { isDate } from '../utils/validate/date';
import { pick, padZero, createNamespace } from '../utils';
import { times, sharedProps, getTrueValue, getMonthEndDay } from './utils'; // Composition

import { useExpose } from '../composables/use-expose'; // Components

import Picker from '../picker';
import { pickerProps } from '../picker/shared';
var currentYear = new Date().getFullYear();

var _createNamespace = createNamespace('date-picker'),
    _createNamespace2 = _slicedToArray(_createNamespace, 1),
    createComponent = _createNamespace2[0];

export default createComponent({
  props: _objectSpread(_objectSpread({}, sharedProps), {}, {
    type: {
      type: String,
      default: 'datetime'
    },
    minDate: {
      type: Date,
      default: function _default() {
        return new Date(currentYear - 10, 0, 1);
      },
      validator: isDate
    },
    maxDate: {
      type: Date,
      default: function _default() {
        return new Date(currentYear + 10, 11, 31);
      },
      validator: isDate
    }
  }),
  emits: ['confirm', 'cancel', 'change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var formatValue = function formatValue(value) {
      if (!isDate(value)) {
        value = props.minDate;
      }

      value = Math.max(value, props.minDate.getTime());
      value = Math.min(value, props.maxDate.getTime());
      return new Date(value);
    };

    var picker = ref();
    var currentDate = ref(formatValue(props.modelValue));

    var getBoundary = function getBoundary(type, value) {
      var _ref2;

      var boundary = props["".concat(type, "Date")];
      var year = boundary.getFullYear();
      var month = 1;
      var date = 1;
      var hour = 0;
      var minute = 0;

      if (type === 'max') {
        month = 12;
        date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
        hour = 23;
        minute = 59;
      }

      if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1;

        if (value.getMonth() + 1 === month) {
          date = boundary.getDate();

          if (value.getDate() === date) {
            hour = boundary.getHours();

            if (value.getHours() === hour) {
              minute = boundary.getMinutes();
            }
          }
        }
      }

      return _ref2 = {}, _defineProperty(_ref2, "".concat(type, "Year"), year), _defineProperty(_ref2, "".concat(type, "Month"), month), _defineProperty(_ref2, "".concat(type, "Date"), date), _defineProperty(_ref2, "".concat(type, "Hour"), hour), _defineProperty(_ref2, "".concat(type, "Minute"), minute), _ref2;
    };

    var ranges = computed(function () {
      var _getBoundary = getBoundary('max', currentDate.value),
          maxYear = _getBoundary.maxYear,
          maxDate = _getBoundary.maxDate,
          maxMonth = _getBoundary.maxMonth,
          maxHour = _getBoundary.maxHour,
          maxMinute = _getBoundary.maxMinute;

      var _getBoundary2 = getBoundary('min', currentDate.value),
          minYear = _getBoundary2.minYear,
          minDate = _getBoundary2.minDate,
          minMonth = _getBoundary2.minMonth,
          minHour = _getBoundary2.minHour,
          minMinute = _getBoundary2.minMinute;

      var result = [{
        type: 'year',
        range: [minYear, maxYear]
      }, {
        type: 'month',
        range: [minMonth, maxMonth]
      }, {
        type: 'day',
        range: [minDate, maxDate]
      }, {
        type: 'hour',
        range: [minHour, maxHour]
      }, {
        type: 'minute',
        range: [minMinute, maxMinute]
      }];

      switch (props.type) {
        case 'date':
          result = result.slice(0, 3);
          break;

        case 'year-month':
          result = result.slice(0, 2);
          break;

        case 'month-day':
          result = result.slice(1, 3);
          break;

        case 'datehour':
          result = result.slice(0, 4);
          break;
      }

      if (props.columnsOrder) {
        var columnsOrder = props.columnsOrder.concat(result.map(function (column) {
          return column.type;
        }));
        result.sort(function (a, b) {
          return columnsOrder.indexOf(a.type) - columnsOrder.indexOf(b.type);
        });
      }

      return result;
    });
    var originColumns = computed(function () {
      return ranges.value.map(function (_ref3) {
        var type = _ref3.type,
            rangeArr = _ref3.range;
        var values = times(rangeArr[1] - rangeArr[0] + 1, function (index) {
          var value = padZero(rangeArr[0] + index);
          return value;
        });

        if (props.filter) {
          values = props.filter(type, values);
        }

        return {
          type: type,
          values: values
        };
      });
    });
    var columns = computed(function () {
      return originColumns.value.map(function (column) {
        return {
          values: column.values.map(function (value) {
            return props.formatter(column.type, value);
          })
        };
      });
    });

    var updateColumnValue = function updateColumnValue() {
      var value = currentDate.value;
      var formatter = props.formatter;
      var values = originColumns.value.map(function (column) {
        switch (column.type) {
          case 'year':
            return formatter('year', "".concat(value.getFullYear()));

          case 'month':
            return formatter('month', padZero(value.getMonth() + 1));

          case 'day':
            return formatter('day', padZero(value.getDate()));

          case 'hour':
            return formatter('hour', padZero(value.getHours()));

          case 'minute':
            return formatter('minute', padZero(value.getMinutes()));

          default:
            // no default
            return null;
        }
      });
      nextTick(function () {
        picker.value.setValues(values);
      });
    };

    var updateInnerValue = function updateInnerValue() {
      var type = props.type;
      var indexes = picker.value.getIndexes();

      var getValue = function getValue(type) {
        var index = 0;
        originColumns.value.forEach(function (column, columnIndex) {
          if (type === column.type) {
            index = columnIndex;
          }
        });
        var values = originColumns.value[index].values;
        return getTrueValue(values[indexes[index]]);
      };

      var year;
      var month;
      var day;

      if (type === 'month-day') {
        year = currentDate.value.getFullYear();
        month = getValue('month');
        day = getValue('day');
      } else {
        year = getValue('year');
        month = getValue('month');
        day = type === 'year-month' ? 1 : getValue('day');
      }

      var maxDay = getMonthEndDay(year, month);
      day = day > maxDay ? maxDay : day;
      var hour = 0;
      var minute = 0;

      if (type === 'datehour') {
        hour = getValue('hour');
      }

      if (type === 'datetime') {
        hour = getValue('hour');
        minute = getValue('minute');
      }

      var value = new Date(year, month - 1, day, hour, minute);
      currentDate.value = formatValue(value);
    };

    var onConfirm = function onConfirm() {
      emit('confirm', currentDate.value);
    };

    var onCancel = function onCancel() {
      emit('cancel');
    };

    var onChange = function onChange() {
      updateInnerValue();
      nextTick(function () {
        nextTick(function () {
          emit('change', currentDate.value);
        });
      });
    };

    onMounted(function () {
      updateColumnValue();
      nextTick(updateInnerValue);
    });
    watch(columns, updateColumnValue);
    watch(currentDate, function (value) {
      emit('update:modelValue', value);
    });
    watch([function () {
      return props.filter;
    }, function () {
      return props.minDate;
    }, function () {
      return props.maxDate;
    }], updateInnerValue);
    watch(function () {
      return props.modelValue;
    }, function (value) {
      value = formatValue(value);

      if (value.valueOf() !== currentDate.value.valueOf()) {
        currentDate.value = value;
      }
    });
    useExpose({
      getPicker: function getPicker() {
        return picker.value;
      }
    });
    return function () {
      return createVNode(Picker, mergeProps({
        "ref": picker,
        "columns": columns.value,
        "readonly": props.readonly,
        "onChange": onChange,
        "onCancel": onCancel,
        "onConfirm": onConfirm
      }, pick(props, Object.keys(pickerProps))), null);
    };
  }
});