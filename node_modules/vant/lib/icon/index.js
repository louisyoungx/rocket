"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _badge = _interopRequireDefault(require("../badge"));

var _createNamespace = (0, _utils.createNamespace)('icon'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

function isImage(name) {
  return name ? name.indexOf('/') !== -1 : false;
}

var _default2 = createComponent({
  props: {
    dot: Boolean,
    name: String,
    size: [Number, String],
    badge: [Number, String],
    color: String,
    tag: {
      type: String,
      default: 'i'
    },
    classPrefix: {
      type: String,
      default: bem()
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var _slots$default;

      var tag = props.tag,
          dot = props.dot,
          name = props.name,
          size = props.size,
          badge = props.badge,
          color = props.color,
          classPrefix = props.classPrefix;
      var isImageIcon = isImage(name);
      return (0, _vue.createVNode)(_badge.default, {
        "dot": dot,
        "tag": tag,
        "content": badge,
        "class": [classPrefix, isImageIcon ? '' : "".concat(classPrefix, "-").concat(name)],
        "style": {
          color: color,
          fontSize: (0, _utils.addUnit)(size)
        }
      }, {
        default: function _default() {
          return [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots), isImageIcon && (0, _vue.createVNode)("img", {
            "class": bem('image'),
            "src": name
          }, null)];
        }
      });
    };
  }
});

exports.default = _default2;