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

var _tag = _interopRequireDefault(require("../tag"));

var _icon = _interopRequireDefault(require("../icon"));

var _cell = _interopRequireDefault(require("../cell"));

var _radio = _interopRequireDefault(require("../radio"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _createNamespace = (0, _utils.createNamespace)('address-item'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default2 = createComponent({
  props: {
    data: Object,
    disabled: Boolean,
    switchable: Boolean,
    defaultTagText: String
  },
  emits: ['edit', 'click', 'select'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;

    var onClick = function onClick() {
      if (props.switchable) {
        emit('select');
      }

      emit('click');
    };

    var renderRightIcon = function renderRightIcon() {
      return (0, _vue.createVNode)(_icon.default, {
        "name": "edit",
        "class": bem('edit'),
        "onClick": function onClick(event) {
          event.stopPropagation();
          emit('edit');
          emit('click');
        }
      }, null);
    };

    var renderTag = function renderTag() {
      if (props.data.isDefault && props.defaultTagText) {
        return (0, _vue.createVNode)(_tag.default, {
          "type": "danger",
          "round": true,
          "class": bem('tag')
        }, {
          default: function _default() {
            return [props.defaultTagText];
          }
        });
      }
    };

    var renderContent = function renderContent() {
      var data = props.data,
          disabled = props.disabled,
          switchable = props.switchable;
      var Info = [(0, _vue.createVNode)("div", {
        "class": bem('name')
      }, ["".concat(data.name, " ").concat(data.tel), renderTag()]), (0, _vue.createVNode)("div", {
        "class": bem('address')
      }, [data.address])];

      if (switchable && !disabled) {
        return (0, _vue.createVNode)(_radio.default, {
          "name": data.id,
          "iconSize": 18
        }, {
          default: function _default() {
            return [Info];
          }
        });
      }

      return Info;
    };

    return function () {
      var _slots$bottom;

      var disabled = props.disabled;
      return (0, _vue.createVNode)("div", {
        "class": bem({
          disabled: disabled
        }),
        "onClick": onClick
      }, [(0, _vue.createVNode)(_cell.default, {
        "border": false,
        "valueClass": bem('value')
      }, {
        default: renderContent,
        'right-icon': renderRightIcon
      }), (_slots$bottom = slots.bottom) === null || _slots$bottom === void 0 ? void 0 : _slots$bottom.call(slots, _objectSpread(_objectSpread({}, props.data), {}, {
        disabled: disabled
      }))]);
    };
  }
});

exports.default = _default2;