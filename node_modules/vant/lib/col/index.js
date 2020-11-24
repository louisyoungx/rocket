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

var _use = require("@vant/use");

var _row = require("../row");

var _createNamespace = (0, _utils.createNamespace)('col'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default2 = createComponent({
  props: {
    offset: [Number, String],
    tag: {
      type: String,
      default: 'div'
    },
    span: {
      type: [Number, String],
      default: 0
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useParent = (0, _use.useParent)(_row.ROW_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var style = (0, _vue.computed)(function () {
      if (!parent) {
        return;
      }

      var spaces = parent.spaces;

      if (spaces && spaces.value && spaces.value[index.value]) {
        var _spaces$value$value = spaces.value[index.value],
            left = _spaces$value$value.left,
            right = _spaces$value$value.right;
        return {
          paddingLeft: left ? "".concat(left, "px") : null,
          paddingRight: right ? "".concat(right, "px") : null
        };
      }
    });
    return function () {
      var _bem, _slots$default;

      var tag = props.tag,
          span = props.span,
          offset = props.offset;
      return (0, _vue.createVNode)(tag, {
        "style": style.value,
        "class": bem((_bem = {}, (0, _defineProperty2.default)(_bem, span, span), (0, _defineProperty2.default)(_bem, "offset-".concat(offset), offset), _bem))
      }, {
        default: function _default() {
          return [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)];
        }
      });
    };
  }
});

exports.default = _default2;