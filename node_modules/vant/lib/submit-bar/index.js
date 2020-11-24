"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _icon = _interopRequireDefault(require("../icon"));

var _button = _interopRequireDefault(require("../button"));

var _createNamespace = (0, _utils.createNamespace)('submit-bar'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 3),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1],
    t = _createNamespace2[2];

var _default = createComponent({
  props: {
    tip: String,
    label: String,
    price: Number,
    tipIcon: String,
    loading: Boolean,
    disabled: Boolean,
    textAlign: String,
    buttonText: String,
    buttonColor: String,
    suffixLabel: String,
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    decimalLength: {
      type: [Number, String],
      default: 2
    },
    currency: {
      type: String,
      default: '¥'
    },
    buttonType: {
      type: String,
      default: 'danger'
    }
  },
  emits: ['submit'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var renderText = function renderText() {
      var price = props.price,
          label = props.label,
          currency = props.currency,
          textAlign = props.textAlign,
          suffixLabel = props.suffixLabel,
          decimalLength = props.decimalLength;

      if (typeof price === 'number') {
        var pricePair = (price / 100).toFixed(decimalLength).split('.');
        var decimal = decimalLength ? ".".concat(pricePair[1]) : '';
        return (0, _vue.createVNode)("div", {
          "class": bem('text'),
          "style": {
            textAlign: textAlign
          }
        }, [(0, _vue.createVNode)("span", null, [label || t('label')]), (0, _vue.createVNode)("span", {
          "class": bem('price')
        }, [currency, (0, _vue.createVNode)("span", {
          "class": bem('price-integer')
        }, [pricePair[0]]), decimal]), suffixLabel && (0, _vue.createVNode)("span", {
          "class": bem('suffix-label')
        }, [suffixLabel])]);
      }
    };

    var renderTip = function renderTip() {
      var tip = props.tip,
          tipIcon = props.tipIcon;

      if (slots.tip || tip) {
        var _slots$tip;

        return (0, _vue.createVNode)("div", {
          "class": bem('tip')
        }, [tipIcon && (0, _vue.createVNode)(_icon.default, {
          "class": bem('tip-icon'),
          "name": tipIcon
        }, null), tip && (0, _vue.createVNode)("span", {
          "class": bem('tip-text')
        }, [tip]), (_slots$tip = slots.tip) === null || _slots$tip === void 0 ? void 0 : _slots$tip.call(slots)]);
      }
    };

    var onClickButton = function onClickButton() {
      emit('submit');
    };

    var renderButton = function renderButton() {
      if (slots.button) {
        return slots.button();
      }

      return (0, _vue.createVNode)(_button.default, {
        "round": true,
        "type": props.buttonType,
        "text": props.buttonText,
        "class": bem('button', props.buttonType),
        "color": props.buttonColor,
        "loading": props.loading,
        "disabled": props.disabled,
        "onClick": onClickButton
      }, null);
    };

    return function () {
      var _slots$top, _slots$default;

      return (0, _vue.createVNode)("div", {
        "class": bem({
          unfit: !props.safeAreaInsetBottom
        })
      }, [(_slots$top = slots.top) === null || _slots$top === void 0 ? void 0 : _slots$top.call(slots), renderTip(), (0, _vue.createVNode)("div", {
        "class": bem('bar')
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots), renderText(), renderButton()])]);
    };
  }
});

exports.default = _default;