import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { watch, computed, nextTick, onMounted, reactive, createVNode, vShow, withDirectives } from "vue";
// Utils
import { createNamespace } from '../utils'; // Composition

import { useWindowSize } from '@vant/use';
import { useRefs } from '../composables/use-refs'; // Components

import Tab from '../tab';
import Tabs from '../tabs';
import Field from '../field';
import Button from '../button';
import Coupon from '../coupon';

var _createNamespace = createNamespace('coupon-list'),
    _createNamespace2 = _slicedToArray(_createNamespace, 3),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1],
    t = _createNamespace2[2];

var EMPTY_IMAGE = 'https://img.yzcdn.cn/vant/coupon-empty.png';
export default createComponent({
  props: {
    code: String,
    enabledTitle: String,
    disabledTitle: String,
    closeButtonText: String,
    inputPlaceholder: String,
    exchangeButtonText: String,
    exchangeButtonLoading: Boolean,
    exchangeButtonDisabled: Boolean,
    exchangeMinLength: {
      type: Number,
      default: 1
    },
    chosenCoupon: {
      type: Number,
      default: -1
    },
    coupons: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    disabledCoupons: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    displayedCouponIndex: {
      type: Number,
      default: -1
    },
    showExchangeBar: {
      type: Boolean,
      default: true
    },
    showCloseButton: {
      type: Boolean,
      default: true
    },
    showCount: {
      type: Boolean,
      default: true
    },
    currency: {
      type: String,
      default: '¥'
    },
    emptyImage: {
      type: String,
      default: EMPTY_IMAGE
    }
  },
  emits: ['change', 'exchange', 'update:code'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var _useRefs = useRefs(),
        _useRefs2 = _slicedToArray(_useRefs, 2),
        couponRefs = _useRefs2[0],
        setCouponRefs = _useRefs2[1];

    var state = reactive({
      tab: 0,
      code: props.code || ''
    });

    var _useWindowSize = useWindowSize(),
        windowHeight = _useWindowSize.height;

    var buttonDisabled = computed(function () {
      return !props.exchangeButtonLoading && (props.exchangeButtonDisabled || !state.code || state.code.length < props.exchangeMinLength);
    });
    var listStyle = computed(function () {
      return {
        height: windowHeight.value - (props.showExchangeBar ? 140 : 94) + 'px'
      };
    });

    var onExchange = function onExchange() {
      emit('exchange', state.code); // auto clear currentCode when not use vModel

      if (!props.code) {
        state.code = '';
      }
    };

    var scrollToCoupon = function scrollToCoupon(index) {
      nextTick(function () {
        if (couponRefs.value[index]) {
          couponRefs.value[index].scrollIntoView();
        }
      });
    };

    var renderEmpty = function renderEmpty() {
      return createVNode("div", {
        "class": bem('empty')
      }, [createVNode("img", {
        "src": props.emptyImage
      }, null), createVNode("p", null, [t('empty')])]);
    };

    var renderExchangeBar = function renderExchangeBar() {
      if (props.showExchangeBar) {
        return createVNode("div", {
          "class": bem('exchange-bar')
        }, [createVNode(Field, {
          "modelValue": state.code,
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            return state.code = $event;
          },
          "clearable": true,
          "border": false,
          "class": bem('field'),
          "placeholder": props.inputPlaceholder || t('placeholder'),
          "maxlength": "20"
        }, null), createVNode(Button, {
          "plain": true,
          "type": "danger",
          "class": bem('exchange'),
          "text": props.exchangeButtonText || t('exchange'),
          "loading": props.exchangeButtonLoading,
          "disabled": buttonDisabled.value,
          "onClick": onExchange
        }, null)]);
      }
    };

    var renderCouponTab = function renderCouponTab() {
      var coupons = props.coupons;
      var count = props.showCount ? " (".concat(coupons.length, ")") : '';
      var title = (props.enabledTitle || t('enable')) + count;
      return createVNode(Tab, {
        "title": title
      }, {
        default: function _default() {
          return [createVNode("div", {
            "class": bem('list', {
              'with-bottom': props.showCloseButton
            }),
            "style": listStyle.value
          }, [coupons.map(function (coupon, index) {
            return createVNode(Coupon, {
              "key": coupon.id,
              "ref": setCouponRefs(index),
              "coupon": coupon,
              "chosen": index === props.chosenCoupon,
              "currency": props.currency,
              "onClick": function onClick() {
                return emit('change', index);
              }
            }, null);
          }), !coupons.length && renderEmpty()])];
        }
      });
    };

    var renderDisabledTab = function renderDisabledTab() {
      var disabledCoupons = props.disabledCoupons;
      var count = props.showCount ? " (".concat(disabledCoupons.length, ")") : '';
      var title = (props.disabledTitle || t('disabled')) + count;
      return createVNode(Tab, {
        "title": title
      }, {
        default: function _default() {
          return [createVNode("div", {
            "class": bem('list', {
              'with-bottom': props.showCloseButton
            }),
            "style": listStyle.value
          }, [disabledCoupons.map(function (coupon) {
            return createVNode(Coupon, {
              "disabled": true,
              "key": coupon.id,
              "coupon": coupon,
              "currency": props.currency
            }, null);
          }), !disabledCoupons.length && renderEmpty()])];
        }
      });
    };

    watch(function () {
      return props.code;
    }, function (value) {
      state.code = value;
    });
    watch(function () {
      return state.code;
    }, function (value) {
      emit('update:code', value);
    });
    watch(function () {
      return props.displayedCouponIndex;
    }, scrollToCoupon);
    onMounted(function () {
      scrollToCoupon(props.displayedCouponIndex);
    });
    return function () {
      return createVNode("div", {
        "class": bem()
      }, [renderExchangeBar(), createVNode(Tabs, {
        "modelValue": state.tab,
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return state.tab = $event;
        },
        "class": bem('tab'),
        "border": false
      }, {
        default: function _default() {
          return [renderCouponTab(), renderDisabledTab()];
        }
      }), createVNode("div", {
        "class": bem('bottom')
      }, [withDirectives(createVNode(Button, {
        "round": true,
        "block": true,
        "type": "danger",
        "class": bem('close'),
        "text": props.closeButtonText || t('close'),
        "onClick": function onClick() {
          emit('change', -1);
        }
      }, null), [[vShow, props.showCloseButton]])])]);
    };
  }
});