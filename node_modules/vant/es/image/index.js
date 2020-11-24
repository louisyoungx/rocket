import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { ref, watch, computed, createVNode, resolveDirective, mergeProps, withDirectives } from "vue";
import { isDef, addUnit, inBrowser, createNamespace } from '../utils';
import Icon from '../icon';

var _createNamespace = createNamespace('image'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
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
    var error = ref(false);
    var loading = ref(true);
    var imageRef = ref();
    var style = computed(function () {
      var style = {};

      if (isDef(props.width)) {
        style.width = addUnit(props.width);
      }

      if (isDef(props.height)) {
        style.height = addUnit(props.height);
      }

      if (isDef(props.radius)) {
        style.overflow = 'hidden';
        style.borderRadius = addUnit(props.radius);
      }

      return style;
    });
    watch(function () {
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

      return createVNode(Icon, {
        "name": props.loadingIcon,
        "class": bem('loading-icon'),
        "classPrefix": props.iconPrefix
      }, null);
    };

    var renderErrorIcon = function renderErrorIcon() {
      if (slots.error) {
        return slots.error();
      }

      return createVNode(Icon, {
        "name": props.errorIcon,
        "class": bem('error-icon'),
        "classPrefix": props.iconPrefix
      }, null);
    };

    var renderPlaceholder = function renderPlaceholder() {
      if (loading.value && props.showLoading && inBrowser) {
        return createVNode("div", {
          "class": bem('loading')
        }, [renderLoadingIcon()]);
      }

      if (error.value && props.showError) {
        return createVNode("div", {
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
        return withDirectives(createVNode("img", mergeProps({
          "ref": imageRef
        }, attrs), null), [[resolveDirective("lazy"), props.src]]);
      }

      return createVNode("img", mergeProps({
        "src": props.src,
        "onLoad": onLoad,
        "onError": onError
      }, attrs), null);
    };

    return function () {
      var _slots$default;

      return createVNode("div", {
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