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

var _useExpose = require("../composables/use-expose");

var _TimePicker = _interopRequireDefault(require("./TimePicker"));

var _DatePicker = _interopRequireDefault(require("./DatePicker"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _createNamespace = (0, _utils.createNamespace)('datetime-picker'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var timePickerProps = Object.keys(_TimePicker.default.props);
var datePickerProps = Object.keys(_DatePicker.default.props);

var _default = createComponent({
  props: _objectSpread(_objectSpread({}, _TimePicker.default.props), _DatePicker.default.props),
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs;
    var root = (0, _vue.ref)();
    (0, _useExpose.useExpose)({
      getPicker: function getPicker() {
        var _root$value;

        return (_root$value = root.value) === null || _root$value === void 0 ? void 0 : _root$value.getPicker();
      }
    });
    return function () {
      var isTimePicker = props.type === 'time';
      var Component = isTimePicker ? _TimePicker.default : _DatePicker.default;
      var inheritProps = (0, _utils.pick)(props, isTimePicker ? timePickerProps : datePickerProps);
      return (0, _vue.createVNode)(Component, (0, _vue.mergeProps)({
        "ref": root,
        "class": bem()
      }, _objectSpread(_objectSpread({}, inheritProps), attrs)), null);
    };
  }
});

exports.default = _default;