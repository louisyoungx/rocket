import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { ref, watch, nextTick, onUpdated, onMounted, createVNode } from "vue";
// Utils
import { isHidden, createNamespace } from '../utils'; // Composition

import { useRect, useScrollParent, useEventListener } from '@vant/use';
import { useExpose } from '../composables/use-expose'; // Components

import Loading from '../loading';

var _createNamespace = createNamespace('list'),
    _createNamespace2 = _slicedToArray(_createNamespace, 3),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1],
    t = _createNamespace2[2];

export default createComponent({
  props: {
    error: Boolean,
    loading: Boolean,
    finished: Boolean,
    errorText: String,
    loadingText: String,
    finishedText: String,
    offset: {
      type: [Number, String],
      default: 300
    },
    direction: {
      type: String,
      default: 'down'
    },
    immediateCheck: {
      type: Boolean,
      default: true
    }
  },
  emits: ['load', 'update:error', 'update:loading'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    // use sync innerLoading state to avoid repeated loading in some edge cases
    var loading = ref(false);
    var root = ref();
    var placeholder = ref();
    var scrollParent = useScrollParent(root);

    var check = function check() {
      nextTick(function () {
        if (loading.value || props.finished || props.error) {
          return;
        }

        var offset = props.offset,
            direction = props.direction;
        var scrollParentRect = useRect(scrollParent);

        if (!scrollParentRect.height || isHidden(root)) {
          return false;
        }

        var isReachEdge = false;
        var placeholderRect = useRect(placeholder);

        if (direction === 'up') {
          isReachEdge = scrollParentRect.top - placeholderRect.top <= offset;
        } else {
          isReachEdge = placeholderRect.bottom - scrollParentRect.bottom <= offset;
        }

        if (isReachEdge) {
          loading.value = true;
          emit('update:loading', true);
          emit('load');
        }
      });
    };

    var renderFinishedText = function renderFinishedText() {
      if (props.finished) {
        var text = slots.finished ? slots.finished() : props.finishedText;

        if (text) {
          return createVNode("div", {
            "class": bem('finished-text')
          }, [text]);
        }
      }
    };

    var clickErrorText = function clickErrorText() {
      emit('update:error', false);
      check();
    };

    var renderErrorText = function renderErrorText() {
      if (props.error) {
        var text = slots.error ? slots.error() : props.errorText;

        if (text) {
          return createVNode("div", {
            "class": bem('error-text'),
            "onClick": clickErrorText
          }, [text]);
        }
      }
    };

    var renderLoading = function renderLoading() {
      if (loading.value && !props.finished) {
        return createVNode("div", {
          "class": bem('loading')
        }, [slots.loading ? slots.loading() : createVNode(Loading, {
          "size": 16
        }, {
          default: function _default() {
            return [props.loadingText || t('loading')];
          }
        })]);
      }
    };

    watch([function () {
      return props.loading;
    }, function () {
      return props.finished;
    }], check);
    onUpdated(function () {
      loading.value = props.loading;
    });
    onMounted(function () {
      if (props.immediateCheck) {
        check();
      }
    });
    useExpose({
      check: check
    });
    useEventListener('scroll', check, {
      target: scrollParent
    });
    return function () {
      var _slots$default;

      var Content = (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots);
      var Placeholder = createVNode("div", {
        "ref": placeholder,
        "class": bem('placeholder')
      }, null);
      return createVNode("div", {
        "ref": root,
        "role": "feed",
        "class": bem(),
        "aria-busy": loading.value
      }, [props.direction === 'down' ? Content : Placeholder, renderLoading(), renderFinishedText(), renderErrorText(), props.direction === 'up' ? Content : Placeholder]);
    };
  }
});