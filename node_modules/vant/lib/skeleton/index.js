"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _createNamespace = (0, _utils.createNamespace)('skeleton'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var DEFAULT_ROW_WIDTH = '100%';
var DEFAULT_LAST_ROW_WIDTH = '60%';

var _default = createComponent({
  props: {
    title: Boolean,
    round: Boolean,
    avatar: Boolean,
    avatarSize: [Number, String],
    titleWidth: [Number, String],
    row: {
      type: [Number, String],
      default: 0
    },
    loading: {
      type: Boolean,
      default: true
    },
    animate: {
      type: Boolean,
      default: true
    },
    avatarShape: {
      type: String,
      default: 'round'
    },
    rowWidth: {
      type: [Number, String, Array],
      default: DEFAULT_ROW_WIDTH
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var renderAvatar = function renderAvatar() {
      if (props.avatar) {
        return (0, _vue.createVNode)("div", {
          "class": bem('avatar', props.avatarShape),
          "style": (0, _utils.getSizeStyle)(props.avatarSize)
        }, null);
      }
    };

    var renderTitle = function renderTitle() {
      if (props.title) {
        return (0, _vue.createVNode)("h3", {
          "class": bem('title'),
          "style": {
            width: (0, _utils.addUnit)(props.titleWidth)
          }
        }, null);
      }
    };

    var getRowWidth = function getRowWidth(index) {
      var rowWidth = props.rowWidth;

      if (rowWidth === DEFAULT_ROW_WIDTH && index === +props.row - 1) {
        return DEFAULT_LAST_ROW_WIDTH;
      }

      if (Array.isArray(rowWidth)) {
        return rowWidth[index];
      }

      return rowWidth;
    };

    var renderRows = function renderRows() {
      var Rows = [];

      for (var i = 0; i < props.row; i++) {
        Rows.push((0, _vue.createVNode)("div", {
          "class": bem('row'),
          "style": {
            width: (0, _utils.addUnit)(getRowWidth(i))
          }
        }, null));
      }

      return Rows;
    };

    return function () {
      if (!props.loading) {
        var _slots$default;

        return (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots);
      }

      return (0, _vue.createVNode)("div", {
        "class": bem({
          animate: props.animate,
          round: props.round
        })
      }, [renderAvatar(), (0, _vue.createVNode)("div", {
        "class": bem('content')
      }, [renderTitle(), renderRows()])]);
    };
  }
});

exports.default = _default;