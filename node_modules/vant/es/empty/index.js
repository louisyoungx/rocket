import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createVNode } from "vue";
import { createNamespace, getSizeStyle } from '../utils';
import { Network } from './Network';

var _createNamespace = createNamespace('empty'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var PRESET_IMAGES = ['error', 'search', 'default'];
export default createComponent({
  props: {
    imageSize: [Number, String],
    description: String,
    image: {
      type: String,
      default: 'default'
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var renderImage = function renderImage() {
      if (slots.image) {
        return slots.image();
      }

      var image = props.image;

      if (image === 'network') {
        return Network;
      }

      if (PRESET_IMAGES.indexOf(image) !== -1) {
        image = "https://img.yzcdn.cn/vant/empty-image-".concat(image, ".png");
      }

      return createVNode("img", {
        "src": image
      }, null);
    };

    var renderDescription = function renderDescription() {
      var description = slots.description ? slots.description() : props.description;

      if (description) {
        return createVNode("p", {
          "class": bem('description')
        }, [description]);
      }
    };

    var renderBottom = function renderBottom() {
      if (slots.default) {
        return createVNode("div", {
          "class": bem('bottom')
        }, [slots.default()]);
      }
    };

    return function () {
      return createVNode("div", {
        "class": bem()
      }, [createVNode("div", {
        "class": bem('image'),
        "style": getSizeStyle(props.imageSize)
      }, [renderImage()]), renderDescription(), renderBottom()]);
    };
  }
});