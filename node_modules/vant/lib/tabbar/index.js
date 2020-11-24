"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TABBAR_KEY = void 0;

var _vue = require("vue");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _constant = require("../utils/constant");

var _interceptor = require("../utils/interceptor");

var _use = require("@vant/use");

var _usePlaceholder = require("../composables/use-placeholder");

// Utils
// Composition
var _createNamespace = (0, _utils.createNamespace)('tabbar'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var TABBAR_KEY = 'vanTabbar';
exports.TABBAR_KEY = TABBAR_KEY;

var _default = createComponent({
  props: {
    route: Boolean,
    zIndex: [Number, String],
    placeholder: Boolean,
    activeColor: String,
    beforeChange: Function,
    inactiveColor: String,
    modelValue: {
      type: [Number, String],
      default: 0
    },
    border: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: null
    }
  },
  emits: ['change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var root = (0, _vue.ref)();

    var _useChildren = (0, _use.useChildren)(TABBAR_KEY),
        linkChildren = _useChildren.linkChildren;

    var renderPlaceholder = (0, _usePlaceholder.usePlaceholder)(root, bem);

    var isUnfit = function isUnfit() {
      if ((0, _utils.isDef)(props.safeAreaInsetBottom)) {
        return !props.safeAreaInsetBottom;
      } // enable safe-area-inset-bottom by default when fixed


      return !props.fixed;
    };

    var renderTabbar = function renderTabbar() {
      var _slots$default;

      var fixed = props.fixed,
          zIndex = props.zIndex,
          border = props.border;
      var unfit = isUnfit();
      return (0, _vue.createVNode)("div", {
        "ref": root,
        "style": {
          zIndex: zIndex
        },
        "class": [bem({
          unfit: unfit,
          fixed: fixed
        }), (0, _defineProperty2.default)({}, _constant.BORDER_TOP_BOTTOM, border)]
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);
    };

    var setActive = function setActive(active) {
      if (active !== props.modelValue) {
        (0, _interceptor.callInterceptor)({
          interceptor: props.beforeChange,
          args: [active],
          done: function done() {
            emit('update:modelValue', active);
            emit('change', active);
          }
        });
      }
    };

    linkChildren({
      props: props,
      setActive: setActive
    });
    return function () {
      if (props.fixed && props.placeholder) {
        return renderPlaceholder(renderTabbar);
      }

      return renderTabbar();
    };
  }
});

exports.default = _default;