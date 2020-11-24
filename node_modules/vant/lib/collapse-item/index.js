"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _use = require("@vant/use");

var _useExpose = require("../composables/use-expose");

var _useLazyRender = require("../composables/use-lazy-render");

var _cell = _interopRequireWildcard(require("../cell"));

var _collapse = require("../collapse");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _createNamespace = (0, _utils.createNamespace)('collapse-item'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var _default = createComponent({
  props: _objectSpread(_objectSpread({}, _cell.cellProps), {}, {
    name: [Number, String],
    disabled: Boolean,
    isLink: {
      type: Boolean,
      default: true
    }
  }),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var wrapperRef = (0, _vue.ref)();
    var contentRef = (0, _vue.ref)();

    var _useParent = (0, _use.useParent)(_collapse.COLLAPSE_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var currentName = (0, _vue.computed)(function () {
      var _props$name;

      return (_props$name = props.name) !== null && _props$name !== void 0 ? _props$name : index.value;
    });
    var expanded = (0, _vue.computed)(function () {
      if (parent) {
        return parent.isExpanded(currentName.value);
      }

      return null;
    });
    var show = (0, _vue.ref)(expanded.value);
    var lazyRender = (0, _useLazyRender.useLazyRender)(show);

    var onTransitionEnd = function onTransitionEnd() {
      if (!expanded.value) {
        show.value = false;
      } else {
        wrapperRef.value.style.height = '';
      }
    };

    (0, _vue.watch)(expanded, function (value, oldValue) {
      if (oldValue === null) {
        return;
      }

      if (value) {
        show.value = true;
      } // Use raf: flick when opened in safari
      // Use nextTick: closing animation failed when set `user-select: none`


      var tick = value ? _vue.nextTick : _use.raf;
      tick(function () {
        if (!contentRef.value || !wrapperRef.value) {
          return;
        }

        var offsetHeight = contentRef.value.offsetHeight;

        if (offsetHeight) {
          var contentHeight = "".concat(offsetHeight, "px");
          wrapperRef.value.style.height = value ? 0 : contentHeight; // use double raf to ensure animation can start

          (0, _use.doubleRaf)(function () {
            wrapperRef.value.style.height = value ? contentHeight : 0;
          });
        } else {
          onTransitionEnd();
        }
      });
    });

    var toggle = function toggle() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !expanded.value;
      parent.toggle(currentName.value, value);
    };

    var onClickTitle = function onClickTitle() {
      if (!props.disabled) {
        toggle();
      }
    };

    var renderTitle = function renderTitle() {
      var border = props.border,
          disabled = props.disabled;
      return (0, _vue.createVNode)(_cell.default, (0, _vue.mergeProps)({
        "role": "button",
        "class": bem('title', {
          disabled: disabled,
          expanded: expanded.value,
          borderless: !border
        }),
        "tabindex": disabled ? -1 : 0,
        "aria-expanded": String(expanded.value),
        "onClick": onClickTitle
      }, props), {
        icon: slots.icon,
        title: slots.title,
        default: slots.value,
        'right-icon': slots['right-icon']
      });
    };

    var renderContent = lazyRender(function () {
      var _slots$default;

      return (0, _vue.withDirectives)((0, _vue.createVNode)("div", {
        "ref": wrapperRef,
        "class": bem('wrapper'),
        "onTransitionend": onTransitionEnd
      }, [(0, _vue.createVNode)("div", {
        "ref": contentRef,
        "class": bem('content')
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)])]), [[_vue.vShow, show.value]]);
    });
    (0, _useExpose.useExpose)({
      toggle: toggle
    });
    return function () {
      return (0, _vue.createVNode)("div", {
        "class": [bem({
          border: index.value && props.border
        })]
      }, [renderTitle(), renderContent()]);
    };
  }
});

exports.default = _default;