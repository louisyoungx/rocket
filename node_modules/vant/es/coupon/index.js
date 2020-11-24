import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { computed, createVNode } from "vue";
import { padZero, createNamespace } from '../utils';
import { RED } from '../utils/constant';
import Checkbox from '../checkbox';

var _createNamespace = createNamespace('coupon'),
    _createNamespace2 = _slicedToArray(_createNamespace, 3),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1],
    t = _createNamespace2[2];

function getDate(timeStamp) {
  var date = new Date(timeStamp * 1000);
  return "".concat(date.getFullYear(), ".").concat(padZero(date.getMonth() + 1), ".").concat(padZero(date.getDate()));
}

function formatDiscount(discount) {
  return (discount / 10).toFixed(discount % 10 === 0 ? 0 : 1);
}

function formatAmount(amount) {
  return (amount / 100).toFixed(amount % 100 === 0 ? 0 : amount % 10 === 0 ? 1 : 2);
}

export default createComponent({
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
    var validPeriod = computed(function () {
      var _props$coupon = props.coupon,
          startAt = _props$coupon.startAt,
          endAt = _props$coupon.endAt;
      return "".concat(getDate(startAt), " - ").concat(getDate(endAt));
    });
    var faceAmount = computed(function () {
      var coupon = props.coupon,
          currency = props.currency;

      if (coupon.valueDesc) {
        return [coupon.valueDesc, createVNode("span", null, [coupon.unitDesc || ''])];
      }

      if (coupon.denominations) {
        var denominations = formatAmount(coupon.denominations);
        return [createVNode("span", null, [currency]), " ".concat(denominations)];
      }

      if (coupon.discount) {
        return t('discount', formatDiscount(coupon.discount));
      }

      return '';
    });
    var conditionMessage = computed(function () {
      var condition = formatAmount(props.coupon.originCondition);
      return condition === '0' ? t('unlimited') : t('condition', condition);
    });
    return function () {
      var chosen = props.chosen,
          coupon = props.coupon,
          disabled = props.disabled;
      var description = disabled && coupon.reason || coupon.description;
      return createVNode("div", {
        "class": bem({
          disabled: disabled
        })
      }, [createVNode("div", {
        "class": bem('content')
      }, [createVNode("div", {
        "class": bem('head')
      }, [createVNode("h2", {
        "class": bem('amount')
      }, [faceAmount.value]), createVNode("p", {
        "class": bem('condition')
      }, [coupon.condition || conditionMessage.value])]), createVNode("div", {
        "class": bem('body')
      }, [createVNode("p", {
        "class": bem('name')
      }, [coupon.name]), createVNode("p", {
        "class": bem('valid')
      }, [validPeriod.value]), !disabled && createVNode(Checkbox, {
        "size": 18,
        "class": bem('corner'),
        "modelValue": chosen,
        "checkedColor": RED
      }, null)])]), description && createVNode("p", {
        "class": bem('description')
      }, [description])]);
    };
  }
});