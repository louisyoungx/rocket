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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _createNamespace = (0, _utils.createNamespace)('loading'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var SpinIcon = [];

for (var i = 0; i < 12; i++) {
  SpinIcon.push((0, _vue.createVNode)("i", null, null));
}

var CircularIcon = (0, _vue.createVNode)("svg", {
  "class": bem('circular'),
  "viewBox": "25 25 50 50"
}, [(0, _vue.createVNode)("circle", {
  "cx": "50",
  "cy": "50",
  "r": "20",
  "fill": "none"
}, null)]);

var _default = createComponent({
  props: {
    size: [Number, String],
    color: String,
    vertical: Boolean,
    textSize: [Number, String],
    type: {
      type: String,
      default: 'circular'
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var spinnerStyle = (0, _vue.computed)(function () {
      return _objectSpread({
        color: props.color
      }, (0, _utils.getSizeStyle)(props.size));
    });

    var renderText = function renderText() {
      if (slots.default) {
        return (0, _vue.createVNode)("span", {
          "class": bem('text'),
          "style": {
            fontSize: (0, _utils.addUnit)(props.textSize)
          }
        }, [slots.default()]);
      }
    };

    return function () {
      var type = props.type,
          vertical = props.vertical;
      return (0, _vue.createVNode)("div", {
        "class": bem([type, {
          vertical: vertical
        }])
      }, [(0, _vue.createVNode)("span", {
        "class": bem('spinner', type),
        "style": spinnerStyle.value
      }, [type === 'spinner' ? SpinIcon : CircularIcon]), renderText()]);
    };
  }
});

exports.default = _default;