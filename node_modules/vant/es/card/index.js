import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createVNode, createTextVNode } from "vue";
// Utils
import { createNamespace, isDef } from '../utils'; // Components

import Tag from '../tag';
import Image from '../image';

var _createNamespace = createNamespace('card'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: {
    tag: String,
    desc: String,
    thumb: String,
    title: String,
    centered: Boolean,
    lazyLoad: Boolean,
    thumbLink: String,
    num: [Number, String],
    price: [Number, String],
    originPrice: [Number, String],
    currency: {
      type: String,
      default: '¥'
    }
  },
  emits: ['click-thumb'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;

    var renderTitle = function renderTitle() {
      if (slots.title) {
        return slots.title();
      }

      if (props.title) {
        return createVNode("div", {
          "class": [bem('title'), 'van-multi-ellipsis--l2']
        }, [props.title]);
      }
    };

    var renderThumbTag = function renderThumbTag() {
      if (slots.tag || props.tag) {
        return createVNode("div", {
          "class": bem('tag')
        }, [slots.tag ? slots.tag() : createVNode(Tag, {
          "mark": true,
          "type": "danger"
        }, {
          default: function _default() {
            return [props.tag];
          }
        })]);
      }
    };

    var renderThumbImage = function renderThumbImage() {
      if (slots.thumb) {
        return slots.thumb();
      }

      return createVNode(Image, {
        "src": props.thumb,
        "width": "100%",
        "height": "100%",
        "fit": "cover",
        "lazyLoad": props.lazyLoad
      }, null);
    };

    var renderThumb = function renderThumb() {
      if (slots.thumb || props.thumb) {
        return createVNode("a", {
          "href": props.thumbLink,
          "class": bem('thumb'),
          "onClick": function onClick(event) {
            emit('click-thumb', event);
          }
        }, [renderThumbImage(), renderThumbTag()]);
      }
    };

    var renderDesc = function renderDesc() {
      if (slots.desc) {
        return slots.desc();
      }

      if (props.desc) {
        return createVNode("div", {
          "class": [bem('desc'), 'van-ellipsis']
        }, [props.desc]);
      }
    };

    var renderPriceText = function renderPriceText() {
      var priceArr = props.price.toString().split('.');
      return createVNode("div", null, [createVNode("span", {
        "class": bem('price-currency')
      }, [props.currency]), createVNode("span", {
        "class": bem('price-integer')
      }, [priceArr[0]]), createTextVNode("."), createVNode("span", {
        "class": bem('price-decimal')
      }, [priceArr[1]])]);
    };

    return function () {
      var _slots$priceTop, _slots$bottom, _slots$tags;

      var showNum = slots.num || isDef(props.num);
      var showPrice = slots.price || isDef(props.price);
      var showOriginPrice = slots['origin-price'] || isDef(props.originPrice);
      var showBottom = showNum || showPrice || showOriginPrice || slots.bottom;
      var Price = showPrice && createVNode("div", {
        "class": bem('price')
      }, [slots.price ? slots.price() : renderPriceText()]);
      var OriginPrice = showOriginPrice && createVNode("div", {
        "class": bem('origin-price')
      }, [slots['origin-price'] ? slots['origin-price']() : "".concat(props.currency, " ").concat(props.originPrice)]);
      var Num = showNum && createVNode("div", {
        "class": bem('num')
      }, [slots.num ? slots.num() : "x".concat(props.num)]);
      var Footer = slots.footer && createVNode("div", {
        "class": bem('footer')
      }, [slots.footer()]);
      var Bottom = showBottom && createVNode("div", {
        "class": bem('bottom')
      }, [(_slots$priceTop = slots['price-top']) === null || _slots$priceTop === void 0 ? void 0 : _slots$priceTop.call(slots), Price, OriginPrice, Num, (_slots$bottom = slots.bottom) === null || _slots$bottom === void 0 ? void 0 : _slots$bottom.call(slots)]);
      return createVNode("div", {
        "class": bem()
      }, [createVNode("div", {
        "class": bem('header')
      }, [renderThumb(), createVNode("div", {
        "class": bem('content', {
          centered: props.centered
        })
      }, [createVNode("div", null, [renderTitle(), renderDesc(), (_slots$tags = slots.tags) === null || _slots$tags === void 0 ? void 0 : _slots$tags.call(slots)]), Bottom])]), Footer]);
    };
  }
});