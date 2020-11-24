import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { bem } from './shared';
import { isImageFile } from './utils';
import { isDef, getSizeStyle } from '../utils';
import { callInterceptor } from '../utils/interceptor'; // Components

import Icon from '../icon';
import Image from '../image';
import Loading from '../loading';
export default {
  props: {
    name: String,
    item: Object,
    index: Number,
    imageFit: String,
    lazyLoad: Boolean,
    deletable: Boolean,
    previewSize: [Number, String],
    beforeDelete: Function
  },
  emits: ['delete', 'preview'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var renderMask = function renderMask() {
      var _props$item = props.item,
          status = _props$item.status,
          message = _props$item.message;

      if (status === 'uploading' || status === 'failed') {
        var MaskIcon = status === 'failed' ? createVNode(Icon, {
          "name": "close",
          "class": bem('mask-icon')
        }, null) : createVNode(Loading, {
          "class": bem('loading')
        }, null);
        var showMessage = isDef(message) && message !== '';
        return createVNode("div", {
          "class": bem('mask')
        }, [MaskIcon, showMessage && createVNode("div", {
          "class": bem('mask-message')
        }, [message])]);
      }
    };

    var onDelete = function onDelete(event) {
      var name = props.name,
          item = props.item,
          index = props.index,
          beforeDelete = props.beforeDelete;
      event.stopPropagation();
      callInterceptor({
        interceptor: beforeDelete,
        args: [item, {
          name: name,
          index: index
        }],
        done: function done() {
          emit('delete');
        }
      });
    };

    var onPreview = function onPreview() {
      emit('preview');
    };

    var renderDeleteIcon = function renderDeleteIcon() {
      if (props.deletable && props.item.status !== 'uploading') {
        return createVNode("div", {
          "class": bem('preview-delete'),
          "onClick": onDelete
        }, [createVNode(Icon, {
          "name": "cross",
          "class": bem('preview-delete-icon')
        }, null)]);
      }
    };

    var renderCover = function renderCover() {
      if (slots['preview-cover']) {
        var index = props.index,
            item = props.item;
        return createVNode("div", {
          "class": bem('preview-cover')
        }, [slots['preview-cover'](_objectSpread({
          index: index
        }, item))]);
      }
    };

    var renderPreview = function renderPreview() {
      var item = props.item;

      if (isImageFile(item)) {
        return createVNode(Image, {
          "fit": props.imageFit,
          "src": item.content || item.url,
          "class": bem('preview-image'),
          "width": props.previewSize,
          "height": props.previewSize,
          "lazyLoad": props.lazyLoad,
          "onClick": onPreview
        }, {
          default: function _default() {
            return [renderCover()];
          }
        });
      }

      return createVNode("div", {
        "class": bem('file'),
        "style": getSizeStyle(props.previewSize)
      }, [createVNode(Icon, {
        "class": bem('file-icon'),
        "name": "description"
      }, null), createVNode("div", {
        "class": [bem('file-name'), 'van-ellipsis']
      }, [item.file ? item.file.name : item.url]), renderCover()]);
    };

    return function () {
      return createVNode("div", {
        "class": bem('preview')
      }, [renderPreview(), renderMask(), renderDeleteIcon()]);
    };
  }
};