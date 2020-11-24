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

var _createNamespace = (0, _utils.createNamespace)('image'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default = createComponent({
  props: {
    src: String,
    alt: String,
    fit: String,
    round: Boolean,
    width: [Number, String],
    height: [Number, String],
    radius: [Number, String],
    lazyLoad: Boolean,
    iconPrefix: String,
    showError: {
      type: Boolean,
      default: true
    },
    showLoading: {
      type: Boolean,
      default: true
    },
    errorIcon: {
      type: String,
      default: 'photo-fail'
    },
    loadingIcon: {
      type: String,
      default: 'photo'
    }
  },
  emits: ['load', 'error'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var error = (0, _vue.ref)(false);
    var loading = (0, _vue.ref)(true);
    var imageRef = (0, _vue.ref)();
    var style = (0, _vue.computed)(function () {
      var style = {};

      if ((0, _utils.isDef)(props.width)) {
        style.width = (0, _utils.addUnit)(props.width);
      }

      if ((0, _utils.isDef)(props.height)) {
        style.height = (0, _utils.addUnit)(props.height);
      }

      if ((0, _utils.isDef)(props.radius)) {
        style.overflow = 'hidden';
        style.borderRadius = (0, _utils.addUnit)(props.radius);
      }

      return style;
    });
    (0, _vue.watch)(function () {
      return props.src;
    }, function () {
      error.value = false;
      loading.value = true;
    });

    var onLoad = function onLoad(event) {
      loading.value = false;
      emit('load', event);
    };

    var onError = function onError(event) {
      error.value = true;
      loading.value = false;
      emit('error', event);
    };

    var renderLoadingIcon = function renderLoadingIcon() {
      if (slots.loading) {
        return slots.loading();
      }

      return (0, _vue.createVNode)(_icon.default, {
        "name": props.loadingIcon,
        "class": bem('loading-icon'),
        "classPrefix": props.iconPrefix
      }, null);
    };

    var renderErrorIcon = function renderErrorIcon() {
      if (slots.error) {
        return slots.error();
      }

      return (0, _vue.createVNode)(_icon.default, {
        "name": props.errorIcon,
        "class": bem('error-icon'),
        "classPrefix": props.iconPrefix
      }, null);
    };

    var renderPlaceholder = function renderPlaceholder() {
      if (loading.value && props.showLoading && _utils.inBrowser) {
        return (0, _vue.createVNode)("div", {
          "class": bem('loading')
        }, [renderLoadingIcon()]);
      }

      if (error.value && props.showError) {
        return (0, _vue.createVNode)("div", {
          "class": bem('error')
        }, [renderErrorIcon()]);
      }
    };

    var renderImage = function renderImage() {
      if (error.value || !props.src) {
        return;
      }

      var attrs = {
        alt: props.alt,
        class: bem('img'),
        style: {
          objectFit: props.fit
        }
      };

      if (props.lazyLoad) {
        return (0, _vue.withDirectives)((0, _vue.createVNode)("img", (0, _vue.mergeProps)({
          "ref": imageRef
        }, attrs), null), [[(0, _vue.resolveDirective)("lazy"), props.src]]);
      }

      return (0, _vue.createVNode)("img", (0, _vue.mergeProps)({
        "src": props.src,
        "onLoad": onLoad,
        "onError": onError
      }, attrs), null);
    };

    return function () {
      var _slots$default;

      return (0, _vue.createVNode)("div", {
        "class": bem({
          round: props.round
        }),
        "style": style.value
      }, [renderImage(), renderPlaceholder(), (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);
    };
  } // TODO: lazyLoad
  // created() {
  //   const { $Lazyload } = this;
  //   if ($Lazyload && inBrowser) {
  //     $Lazyload.$on('loaded', this.onLazyLoaded);
  //     $Lazyload.$on('error', this.onLazyLoadError);
  //   }
  // },
  // beforeUnmount() {
  //   const { $Lazyload } = this;
  //   if ($Lazyload) {
  //     $Lazyload.$off('loaded', this.onLazyLoaded);
  //     $Lazyload.$off('error', this.onLazyLoadError);
  //   }
  // },
  // methods: {
  // onLazyLoaded({ el }) {
  //   if (el === this.$refs.image && this.loading) {
  //     this.onLoad();
  //   }
  // },
  // onLazyLoadError({ el }) {
  //   if (el === this.$refs.image && !this.error) {
  //     this.onError();
  //   }
  // },
  // },

});

exports.default = _default;