"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DROPDOWN_KEY = void 0;

var _vue = require("vue");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _use = require("@vant/use");

// Utils
// Composition
var _createNamespace = (0, _utils.createNamespace)('dropdown-menu'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var DROPDOWN_KEY = 'vanDropdownMenu';
exports.DROPDOWN_KEY = DROPDOWN_KEY;

var _default = createComponent({
  props: {
    zIndex: [Number, String],
    activeColor: String,
    overlay: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 0.2
    },
    direction: {
      type: String,
      default: 'down'
    },
    closeOnClickOutside: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var root = (0, _vue.ref)();
    var offset = (0, _vue.ref)(0);
    var barRef = (0, _vue.ref)();

    var _useChildren = (0, _use.useChildren)(DROPDOWN_KEY),
        children = _useChildren.children,
        linkChildren = _useChildren.linkChildren;

    var scrollParent = (0, _use.useScrollParent)(root);
    var opened = (0, _vue.computed)(function () {
      return children.some(function (item) {
        return item.state.showWrapper;
      });
    });
    var barStyle = (0, _vue.computed)(function () {
      if (opened.value && (0, _utils.isDef)(props.zIndex)) {
        return {
          zIndex: 1 + props.zIndex
        };
      }
    });

    var onClickAway = function onClickAway() {
      if (props.closeOnClickOutside) {
        children.forEach(function (item) {
          item.toggle(false);
        });
      }
    };

    var updateOffset = function updateOffset() {
      if (barRef.value) {
        var rect = (0, _use.useRect)(barRef);

        if (props.direction === 'down') {
          offset.value = rect.bottom;
        } else {
          offset.value = window.innerHeight - rect.top;
        }
      }
    };

    var onScroll = function onScroll() {
      if (opened.value) {
        updateOffset();
      }
    };

    var toggleItem = function toggleItem(active) {
      children.forEach(function (item, index) {
        if (index === active) {
          updateOffset();
          item.toggle();
        } else if (item.state.showPopup) {
          item.toggle(false, {
            immediate: true
          });
        }
      });
    };

    var renderTitle = function renderTitle(item, index) {
      var showPopup = item.state.showPopup;
      var disabled = item.disabled,
          titleClass = item.titleClass;
      return (0, _vue.createVNode)("div", {
        "role": "button",
        "tabindex": disabled ? -1 : 0,
        "class": bem('item', {
          disabled: disabled
        }),
        "onClick": function onClick() {
          if (!disabled) {
            toggleItem(index);
          }
        }
      }, [(0, _vue.createVNode)("span", {
        "class": [bem('title', {
          down: showPopup === (props.direction === 'down'),
          active: showPopup
        }), titleClass],
        "style": {
          color: showPopup ? props.activeColor : ''
        }
      }, [(0, _vue.createVNode)("div", {
        "class": "van-ellipsis"
      }, [item.renderTitle()])])]);
    };

    linkChildren({
      props: props,
      offset: offset
    });
    (0, _use.useClickAway)(root, onClickAway);
    (0, _use.useEventListener)('scroll', onScroll, {
      target: scrollParent
    });
    return function () {
      var _slots$default;

      return (0, _vue.createVNode)("div", {
        "ref": root,
        "class": bem()
      }, [(0, _vue.createVNode)("div", {
        "ref": barRef,
        "style": barStyle.value,
        "class": bem('bar', {
          opened: opened.value
        })
      }, [children.map(renderTitle)]), (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);
    };
  }
});

exports.default = _default;