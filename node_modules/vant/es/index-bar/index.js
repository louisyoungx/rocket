import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { ref, computed, watch, nextTick, createVNode } from "vue";
// Utils
import { isDef, isHidden, getScrollTop, preventDefault, createNamespace, getRootScrollTop, setRootScrollTop } from '../utils'; // Composition

import { useRect, useChildren, useScrollParent, useEventListener } from '@vant/use';
import { useTouch } from '../composables/use-touch';
export var INDEX_BAR_KEY = 'vanIndexBar';

function genAlphabet() {
  var indexList = [];
  var charCodeOfA = 'A'.charCodeAt(0);

  for (var i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i));
  }

  return indexList;
}

var _createNamespace = createNamespace('index-bar'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: {
    zIndex: [Number, String],
    highlightColor: String,
    sticky: {
      type: Boolean,
      default: true
    },
    stickyOffsetTop: {
      type: Number,
      default: 0
    },
    indexList: {
      type: Array,
      default: genAlphabet
    }
  },
  emits: ['select', 'change'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var root = ref();
    var activeAnchor = ref();
    var touch = useTouch();
    var scrollParent = useScrollParent(root);

    var _useChildren = useChildren(INDEX_BAR_KEY),
        children = _useChildren.children,
        linkChildren = _useChildren.linkChildren;

    linkChildren({
      props: props
    });
    var sidebarStyle = computed(function () {
      if (isDef(props.zIndex)) {
        return {
          zIndex: 1 + props.zIndex
        };
      }
    });
    var highlightStyle = computed(function () {
      if (props.highlightColor) {
        return {
          color: props.highlightColor
        };
      }
    });

    var getScrollerRect = function getScrollerRect() {
      if (scrollParent.value.getBoundingClientRect) {
        return useRect(scrollParent);
      }

      return {
        top: 0,
        left: 0
      };
    };

    var getActiveAnchor = function getActiveAnchor(scrollTop, rects) {
      for (var i = children.length - 1; i >= 0; i--) {
        var prevHeight = i > 0 ? rects[i - 1].height : 0;
        var reachTop = props.sticky ? prevHeight + props.stickyOffsetTop : 0;

        if (scrollTop + reachTop >= rects[i].top) {
          return i;
        }
      }

      return -1;
    };

    var onScroll = function onScroll() {
      if (isHidden(root)) {
        return;
      }

      var sticky = props.sticky,
          indexList = props.indexList;
      var scrollTop = getScrollTop(scrollParent.value);
      var scrollParentRect = getScrollerRect();
      var rects = children.map(function (item) {
        return item.getRect(scrollParent.value, scrollParentRect);
      });
      var active = getActiveAnchor(scrollTop, rects);
      activeAnchor.value = indexList[active];

      if (sticky) {
        children.forEach(function (item, index) {
          var state = item.state,
              $el = item.$el;

          if (index === active || index === active - 1) {
            var rect = $el.getBoundingClientRect();
            state.left = rect.left;
            state.width = rect.width;
          } else {
            state.left = null;
            state.width = null;
          }

          if (index === active) {
            state.active = true;
            state.top = Math.max(props.stickyOffsetTop, rects[index].top - scrollTop) + scrollParentRect.top;
          } else if (index === active - 1) {
            var activeItemTop = rects[active].top - scrollTop;
            state.active = activeItemTop > 0;
            state.top = activeItemTop + scrollParentRect.top - rects[index].height;
          } else {
            state.active = false;
          }
        });
      }
    };

    useEventListener('scroll', onScroll, {
      target: scrollParent
    });
    watch(function () {
      return props.indexList;
    }, function () {
      nextTick(onScroll);
    });
    watch(activeAnchor, function (value) {
      if (value) {
        emit('change', value);
      }
    });

    var renderIndexes = function renderIndexes() {
      return props.indexList.map(function (index) {
        var active = index === activeAnchor.value;
        return createVNode("span", {
          "class": bem('index', {
            active: active
          }),
          "style": active ? highlightStyle.value : null,
          "data-index": index
        }, [index]);
      });
    };

    var scrollToElement = function scrollToElement(element) {
      var index = element.dataset.index;

      if (!index) {
        return;
      }

      var match = children.filter(function (item) {
        return String(item.index) === index;
      });

      if (match[0]) {
        match[0].$el.scrollIntoView();

        if (props.sticky && props.stickyOffsetTop) {
          setRootScrollTop(getRootScrollTop() - props.stickyOffsetTop);
        }

        emit('select', match[0].index);
      }
    };

    var onClick = function onClick(event) {
      scrollToElement(event.target);
    };

    var touchActiveIndex;

    var onTouchMove = function onTouchMove(event) {
      touch.move(event);

      if (touch.isVertical()) {
        preventDefault(event);
        var _event$touches$ = event.touches[0],
            clientX = _event$touches$.clientX,
            clientY = _event$touches$.clientY;
        var target = document.elementFromPoint(clientX, clientY);

        if (target) {
          var index = target.dataset.index;
          /* istanbul ignore else */

          if (touchActiveIndex !== index) {
            touchActiveIndex = index;
            scrollToElement(target);
          }
        }
      }
    };

    return function () {
      var _slots$default;

      return createVNode("div", {
        "ref": root,
        "class": bem()
      }, [createVNode("div", {
        "class": bem('sidebar'),
        "style": sidebarStyle.value,
        "onClick": onClick,
        "onTouchstart": touch.start,
        "onTouchmove": onTouchMove
      }, [renderIndexes()]), (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);
    };
  }
});