import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createVNode } from "vue";
import { createNamespace } from '../utils';
import Icon from '../icon';
import Button from '../button';

var _createNamespace = createNamespace('submit-bar'),
    _createNamespace2 = _slicedToArray(_createNamespace, 3),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1],
    t = _createNamespace2[2];

export default createComponent({
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
        return createVNode("div", {
          "class": bem('text'),
          "style": {
            textAlign: textAlign
          }
        }, [createVNode("span", null, [label || t('label')]), createVNode("span", {
          "class": bem('price')
        }, [currency, createVNode("span", {
          "class": bem('price-integer')
        }, [pricePair[0]]), decimal]), suffixLabel && createVNode("span", {
          "class": bem('suffix-label')
        }, [suffixLabel])]);
      }
    };

    var renderTip = function renderTip() {
      var tip = props.tip,
          tipIcon = props.tipIcon;

      if (slots.tip || tip) {
        var _slots$tip;

        return createVNode("div", {
          "class": bem('tip')
        }, [tipIcon && createVNode(Icon, {
          "class": bem('tip-icon'),
          "name": tipIcon
        }, null), tip && createVNode("span", {
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

      return createVNode(Button, {
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

      return createVNode("div", {
        "class": bem({
          unfit: !props.safeAreaInsetBottom
        })
      }, [(_slots$top = slots.top) === null || _slots$top === void 0 ? void 0 : _slots$top.call(slots), renderTip(), createVNode("div", {
        "class": bem('bar')
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots), renderText(), renderButton()])]);
    };
  }
});