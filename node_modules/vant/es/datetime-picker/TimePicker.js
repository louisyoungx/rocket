import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { ref, watch, computed, nextTick, onMounted, mergeProps, createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Utils
import { pick, range, padZero, createNamespace } from '../utils';
import { times, sharedProps } from './utils'; // Composition

import { useExpose } from '../composables/use-expose'; // Components

import Picker from '../picker';
import { pickerProps } from '../picker/shared';

var _createNamespace = createNamespace('time-picker'),
    _createNamespace2 = _slicedToArray(_createNamespace, 1),
    createComponent = _createNamespace2[0];

export default createComponent({
  props: _objectSpread(_objectSpread({}, sharedProps), {}, {
    minHour: {
      type: [Number, String],
      default: 0
    },
    maxHour: {
      type: [Number, String],
      default: 23
    },
    minMinute: {
      type: [Number, String],
      default: 0
    },
    maxMinute: {
      type: [Number, String],
      default: 59
    }
  }),
  emits: ['confirm', 'cancel', 'change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var formatValue = function formatValue(value) {
      var minHour = props.minHour,
          maxHour = props.maxHour,
          maxMinute = props.maxMinute,
          minMinute = props.minMinute;

      if (!value) {
        value = "".concat(padZero(minHour), ":").concat(padZero(minMinute));
      }

      var _value$split = value.split(':'),
          _value$split2 = _slicedToArray(_value$split, 2),
          hour = _value$split2[0],
          minute = _value$split2[1];

      hour = padZero(range(hour, minHour, maxHour));
      minute = padZero(range(minute, minMinute, maxMinute));
      return "".concat(hour, ":").concat(minute);
    };

    var picker = ref();
    var currentDate = ref(formatValue(props.modelValue));
    var ranges = computed(function () {
      return [{
        type: 'hour',
        range: [+props.minHour, +props.maxHour]
      }, {
        type: 'minute',
        range: [+props.minMinute, +props.maxMinute]
      }];
    });
    var originColumns = computed(function () {
      return ranges.value.map(function (_ref2) {
        var type = _ref2.type,
            rangeArr = _ref2.range;
        var values = times(rangeArr[1] - rangeArr[0] + 1, function (index) {
          return padZero(rangeArr[0] + index);
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
      var pair = currentDate.value.split(':');
      var values = [props.formatter('hour', pair[0]), props.formatter('minute', pair[1])];
      nextTick(function () {
        picker.value.setValues(values);
      });
    };

    var updateInnerValue = function updateInnerValue() {
      var _picker$value$getInde = picker.value.getIndexes(),
          _picker$value$getInde2 = _slicedToArray(_picker$value$getInde, 2),
          hourIndex = _picker$value$getInde2[0],
          minuteIndex = _picker$value$getInde2[1];

      var _originColumns$value = _slicedToArray(originColumns.value, 2),
          hourColumn = _originColumns$value[0],
          minuteColumn = _originColumns$value[1];

      var hour = hourColumn.values[hourIndex] || hourColumn.values[0];
      var minute = minuteColumn.values[minuteIndex] || minuteColumn.values[0];
      currentDate.value = formatValue("".concat(hour, ":").concat(minute));
      updateColumnValue();
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
    watch([function () {
      return props.filter;
    }, function () {
      return props.minHour;
    }, function () {
      return props.maxHour;
    }, function () {
      return props.minMinute;
    }, function () {
      return props.maxMinute;
    }], updateInnerValue);
    watch(currentDate, function (value) {
      emit('update:modelValue', value);
    });
    watch(function () {
      return props.modelValue;
    }, function (value) {
      value = formatValue(value);

      if (value !== currentDate.value) {
        currentDate.value = value;
        updateColumnValue();
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