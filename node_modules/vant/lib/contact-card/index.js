"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _cell = _interopRequireDefault(require("../cell"));

var _createNamespace = (0, _utils.createNamespace)('contact-card'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 3),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1],
    t = _createNamespace2[2];

var _default2 = createComponent({
  props: {
    tel: String,
    name: String,
    addText: String,
    editable: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'add'
    }
  },
  emits: ['click'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var onClick = function onClick(event) {
      if (props.editable) {
        emit('click', event);
      }
    };

    var renderContent = function renderContent() {
      if (props.type === 'add') {
        return props.addText || t('addText');
      }

      return [(0, _vue.createVNode)("div", null, ["".concat(t('name'), "\uFF1A").concat(props.name)]), (0, _vue.createVNode)("div", null, ["".concat(t('tel'), "\uFF1A").concat(props.tel)])];
    };

    return function () {
      return (0, _vue.createVNode)(_cell.default, {
        "center": true,
        "icon": props.type === 'edit' ? 'contact' : 'add-square',
        "class": bem([props.type]),
        "border": false,
        "isLink": props.editable,
        "valueClass": bem('value'),
        "onClick": onClick
      }, {
        default: function _default() {
          return [renderContent()];
        }
      });
    };
  }
});

exports.default = _default2;