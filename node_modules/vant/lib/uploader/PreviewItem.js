"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _shared = require("./shared");

var _utils = require("./utils");

var _utils2 = require("../utils");

var _interceptor = require("../utils/interceptor");

var _icon = _interopRequireDefault(require("../icon"));

var _image = _interopRequireDefault(require("../image"));

var _loading = _interopRequireDefault(require("../loading"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default2 = {
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
        var MaskIcon = status === 'failed' ? (0, _vue.createVNode)(_icon.default, {
          "name": "close",
          "class": (0, _shared.bem)('mask-icon')
        }, null) : (0, _vue.createVNode)(_loading.default, {
          "class": (0, _shared.bem)('loading')
        }, null);
        var showMessage = (0, _utils2.isDef)(message) && message !== '';
        return (0, _vue.createVNode)("div", {
          "class": (0, _shared.bem)('mask')
        }, [MaskIcon, showMessage && (0, _vue.createVNode)("div", {
          "class": (0, _shared.bem)('mask-message')
        }, [message])]);
      }
    };

    var onDelete = function onDelete(event) {
      var name = props.name,
          item = props.item,
          index = props.index,
          beforeDelete = props.beforeDelete;
      event.stopPropagation();
      (0, _interceptor.callInterceptor)({
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
        return (0, _vue.createVNode)("div", {
          "class": (0, _shared.bem)('preview-delete'),
          "onClick": onDelete
        }, [(0, _vue.createVNode)(_icon.default, {
          "name": "cross",
          "class": (0, _shared.bem)('preview-delete-icon')
        }, null)]);
      }
    };

    var renderCover = function renderCover() {
      if (slots['preview-cover']) {
        var index = props.index,
            item = props.item;
        return (0, _vue.createVNode)("div", {
          "class": (0, _shared.bem)('preview-cover')
        }, [slots['preview-cover'](_objectSpread({
          index: index
        }, item))]);
      }
    };

    var renderPreview = function renderPreview() {
      var item = props.item;

      if ((0, _utils.isImageFile)(item)) {
        return (0, _vue.createVNode)(_image.default, {
          "fit": props.imageFit,
          "src": item.content || item.url,
          "class": (0, _shared.bem)('preview-image'),
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

      return (0, _vue.createVNode)("div", {
        "class": (0, _shared.bem)('file'),
        "style": (0, _utils2.getSizeStyle)(props.previewSize)
      }, [(0, _vue.createVNode)(_icon.default, {
        "class": (0, _shared.bem)('file-icon'),
        "name": "description"
      }, null), (0, _vue.createVNode)("div", {
        "class": [(0, _shared.bem)('file-name'), 'van-ellipsis']
      }, [item.file ? item.file.name : item.url]), renderCover()]);
    };

    return function () {
      return (0, _vue.createVNode)("div", {
        "class": (0, _shared.bem)('preview')
      }, [renderPreview(), renderMask(), renderDeleteIcon()]);
    };
  }
};
exports.default = _default2;