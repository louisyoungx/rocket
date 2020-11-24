import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { ref, mergeProps, createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { pick, createNamespace } from '../utils';
import { useExpose } from '../composables/use-expose';
import TimePicker from './TimePicker';
import DatePicker from './DatePicker';

var _createNamespace = createNamespace('datetime-picker'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var timePickerProps = Object.keys(TimePicker.props);
var datePickerProps = Object.keys(DatePicker.props);
export default createComponent({
  props: _objectSpread(_objectSpread({}, TimePicker.props), DatePicker.props),
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs;
    var root = ref();
    useExpose({
      getPicker: function getPicker() {
        var _root$value;

        return (_root$value = root.value) === null || _root$value === void 0 ? void 0 : _root$value.getPicker();
      }
    });
    return function () {
      var isTimePicker = props.type === 'time';
      var Component = isTimePicker ? TimePicker : DatePicker;
      var inheritProps = pick(props, isTimePicker ? timePickerProps : datePickerProps);
      return createVNode(Component, mergeProps({
        "ref": root,
        "class": bem()
      }, _objectSpread(_objectSpread({}, inheritProps), attrs)), null);
    };
  }
});