"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _constant = require("../utils/constant");

var _checkbox = _interopRequireDefault(require("../checkbox"));

var _createNamespace = (0, _utils.createNamespace)('coupon'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 3),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1],
    t = _createNamespace2[2];

function getDate(timeStamp) {
  var date = new Date(timeStamp * 1000);
  return "".concat(date.getFullYear(), ".").concat((0, _utils.padZero)(date.getMonth() + 1), ".").concat((0, _utils.padZero)(date.getDate()));
}

function formatDiscount(discount) {
  return (discount / 10).toFixed(discount % 10 === 0 ? 0 : 1);
}

function formatAmount(amount) {
  return (amount / 100).toFixed(amount % 100 === 0 ? 0 : amount % 10 === 0 ? 1 : 2);
}

var _default = createComponent({
  props: {
    coupon: Object,
    chosen: Boolean,
    disabled: Boolean,
    currency: {
      type: String,
      default: '¥'
    }
  },
  setup: function setup(props) {
    var validPeriod = (0, _vue.computed)(function () {
      var _props$coupon = props.coupon,
          startAt = _props$coupon.startAt,
          endAt = _props$coupon.endAt;
      return "".concat(getDate(startAt), " - ").concat(getDate(endAt));
    });
    var faceAmount = (0, _vue.computed)(function () {
      var coupon = props.coupon,
          currency = props.currency;

      if (coupon.valueDesc) {
        return [coupon.valueDesc, (0, _vue.createVNode)("span", null, [coupon.unitDesc || ''])];
      }

      if (coupon.denominations) {
        var denominations = formatAmount(coupon.denominations);
        return [(0, _vue.createVNode)("span", null, [currency]), " ".concat(denominations)];
      }

      if (coupon.discount) {
        return t('discount', formatDiscount(coupon.discount));
      }

      return '';
    });
    var conditionMessage = (0, _vue.computed)(function () {
      var condition = formatAmount(props.coupon.originCondition);
      return condition === '0' ? t('unlimited') : t('condition', condition);
    });
    return function () {
      var chosen = props.chosen,
          coupon = props.coupon,
          disabled = props.disabled;
      var description = disabled && coupon.reason || coupon.description;
      return (0, _vue.createVNode)("div", {
        "class": bem({
          disabled: disabled
        })
      }, [(0, _vue.createVNode)("div", {
        "class": bem('content')
      }, [(0, _vue.createVNode)("div", {
        "class": bem('head')
      }, [(0, _vue.createVNode)("h2", {
        "class": bem('amount')
      }, [faceAmount.value]), (0, _vue.createVNode)("p", {
        "class": bem('condition')
      }, [coupon.condition || conditionMessage.value])]), (0, _vue.createVNode)("div", {
        "class": bem('body')
      }, [(0, _vue.createVNode)("p", {
        "class": bem('name')
      }, [coupon.name]), (0, _vue.createVNode)("p", {
        "class": bem('valid')
      }, [validPeriod.value]), !disabled && (0, _vue.createVNode)(_checkbox.default, {
        "size": 18,
        "class": bem('corner'),
        "modelValue": chosen,
        "checkedColor": _constant.RED
      }, null)])]), description && (0, _vue.createVNode)("p", {
        "class": bem('description')
      }, [description])]);
    };
  }
});

exports.default = _default;