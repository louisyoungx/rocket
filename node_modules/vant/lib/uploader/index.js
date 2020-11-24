"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _shared = require("./shared");

var _utils = require("../utils");

var _utils2 = require("./utils");

var _useExpose = require("../composables/use-expose");

var _useLinkField = require("../composables/use-link-field");

var _icon = _interopRequireDefault(require("../icon"));

var _PreviewItem = _interopRequireDefault(require("./PreviewItem"));

var _imagePreview = _interopRequireDefault(require("../image-preview"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default2 = (0, _shared.createComponent)({
  props: {
    capture: String,
    multiple: Boolean,
    disabled: Boolean,
    lazyLoad: Boolean,
    uploadText: String,
    afterRead: Function,
    beforeRead: Function,
    beforeDelete: Function,
    previewSize: [Number, String],
    previewOptions: Object,
    name: {
      type: [Number, String],
      default: ''
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    modelValue: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    maxSize: {
      type: [Number, String],
      default: Number.MAX_VALUE
    },
    maxCount: {
      type: [Number, String],
      default: Number.MAX_VALUE
    },
    deletable: {
      type: Boolean,
      default: true
    },
    showUpload: {
      type: Boolean,
      default: true
    },
    previewImage: {
      type: Boolean,
      default: true
    },
    previewFullImage: {
      type: Boolean,
      default: true
    },
    imageFit: {
      type: String,
      default: 'cover'
    },
    resultType: {
      type: String,
      default: 'dataUrl'
    },
    uploadIcon: {
      type: String,
      default: 'photograph'
    }
  },
  emits: ['delete', 'oversize', 'close-preview', 'click-preview', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var inputRef = (0, _vue.ref)();

    var getDetail = function getDetail() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : props.modelValue.length;
      return {
        name: props.name,
        index: index
      };
    };

    var resetInput = function resetInput() {
      if (inputRef.value) {
        inputRef.value.value = '';
      }
    };

    var onAfterRead = function onAfterRead(items) {
      resetInput();

      if ((0, _utils2.isOversize)(items, props.maxSize)) {
        if (Array.isArray(items)) {
          var result = (0, _utils2.filterFiles)(items, props.maxSize);
          items = result.valid;
          emit('oversize', result.invalid, getDetail());

          if (!items.length) {
            return;
          }
        } else {
          emit('oversize', items, getDetail());
          return;
        }
      }

      emit('update:modelValue', [].concat((0, _toConsumableArray2.default)(props.modelValue), (0, _toConsumableArray2.default)((0, _utils2.toArray)(items))));

      if (props.afterRead) {
        props.afterRead(items, getDetail());
      }
    };

    var readFile = function readFile(files) {
      var maxCount = props.maxCount,
          modelValue = props.modelValue,
          resultType = props.resultType;

      if (Array.isArray(files)) {
        var remainCount = maxCount - modelValue.length;

        if (files.length > remainCount) {
          files = files.slice(0, remainCount);
        }

        Promise.all(files.map(function (file) {
          return (0, _utils2.readFileContent)(file, resultType);
        })).then(function (contents) {
          var fileList = files.map(function (file, index) {
            var result = {
              file: file,
              status: '',
              message: ''
            };

            if (contents[index]) {
              result.content = contents[index];
            }

            return result;
          });
          onAfterRead(fileList);
        });
      } else {
        (0, _utils2.readFileContent)(files, resultType).then(function (content) {
          var result = {
            file: files,
            status: '',
            message: ''
          };

          if (content) {
            result.content = content;
          }

          onAfterRead(result);
        });
      }
    };

    var onChange = function onChange(event) {
      var files = event.target.files;

      if (props.disabled || !files.length) {
        return;
      }

      files = files.length === 1 ? files[0] : [].slice.call(files);

      if (props.beforeRead) {
        var response = props.beforeRead(files, getDetail());

        if (!response) {
          resetInput();
          return;
        }

        if ((0, _utils.isPromise)(response)) {
          response.then(function (data) {
            if (data) {
              readFile(data);
            } else {
              readFile(files);
            }
          }).catch(resetInput);
          return;
        }
      }

      readFile(files);
    };

    var imagePreview;

    var onClosePreview = function onClosePreview() {
      emit('close-preview');
    };

    var previewImage = function previewImage(item) {
      if (props.previewFullImage) {
        var imageFiles = props.modelValue.filter(_utils2.isImageFile);
        var images = imageFiles.map(function (item) {
          return item.content || item.url;
        });
        imagePreview = (0, _imagePreview.default)(_objectSpread({
          images: images,
          startPosition: imageFiles.indexOf(item),
          onClose: onClosePreview
        }, props.previewOptions));
      }
    };

    var closeImagePreview = function closeImagePreview() {
      if (imagePreview) {
        imagePreview.close();
      }
    };

    var deleteFile = function deleteFile(item, index) {
      var fileList = props.modelValue.slice(0);
      fileList.splice(index, 1);
      emit('update:modelValue', fileList);
      emit('delete', item, getDetail(index));
    };

    var renderPreviewItem = function renderPreviewItem(item, index) {
      return (0, _vue.createVNode)(_PreviewItem.default, (0, _vue.mergeProps)({
        "item": item,
        "index": index,
        "onClick": function onClick() {
          emit('click-preview', item, getDetail(index));
        },
        "onDelete": function onDelete() {
          deleteFile(item, index);
        },
        "onPreview": function onPreview() {
          previewImage(item);
        }
      }, (0, _utils.pick)(props, ['name', 'lazyLoad', 'imageFit', 'deletable', 'previewSize', 'beforeDelete'])), {
        'preview-cover': slots['preview-cover']
      });
    };

    var renderPreviewList = function renderPreviewList() {
      if (props.previewImage) {
        return props.modelValue.map(renderPreviewItem);
      }
    };

    var renderUpload = function renderUpload() {
      if (props.modelValue.length >= props.maxCount || !props.showUpload) {
        return;
      }

      var Input = (0, _vue.createVNode)("input", {
        "ref": inputRef,
        "type": "file",
        "class": (0, _shared.bem)('input'),
        "accept": props.accept,
        "capture": props.capture,
        "multiple": props.multiple,
        "disabled": props.disabled,
        "onChange": onChange
      }, null);

      if (slots.default) {
        return (0, _vue.createVNode)("div", {
          "class": (0, _shared.bem)('input-wrapper')
        }, [slots.default(), Input]);
      }

      return (0, _vue.createVNode)("div", {
        "class": (0, _shared.bem)('upload'),
        "style": (0, _utils.getSizeStyle)(props.previewSize)
      }, [(0, _vue.createVNode)(_icon.default, {
        "name": props.uploadIcon,
        "class": (0, _shared.bem)('upload-icon')
      }, null), props.uploadText && (0, _vue.createVNode)("span", {
        "class": (0, _shared.bem)('upload-text')
      }, [props.uploadText]), Input]);
    };

    var chooseFile = function chooseFile() {
      if (inputRef.value && !props.disabled) {
        inputRef.value.click();
      }
    };

    (0, _useExpose.useExpose)({
      chooseFile: chooseFile,
      closeImagePreview: closeImagePreview
    });
    (0, _useLinkField.useLinkField)(function () {
      return props.modelValue;
    });
    return function () {
      return (0, _vue.createVNode)("div", {
        "class": (0, _shared.bem)()
      }, [(0, _vue.createVNode)("div", {
        "class": (0, _shared.bem)('wrapper', {
          disabled: props.disabled
        })
      }, [renderPreviewList(), renderUpload()])]);
    };
  }
});

exports.default = _default2;