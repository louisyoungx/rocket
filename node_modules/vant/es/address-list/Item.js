import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createVNode, resolveDirective } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Utils
import { createNamespace } from '../utils'; // Components

import Tag from '../tag';
import Icon from '../icon';
import Cell from '../cell';
import Radio from '../radio';

var _createNamespace = createNamespace('address-item'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: {
    data: Object,
    disabled: Boolean,
    switchable: Boolean,
    defaultTagText: String
  },
  emits: ['edit', 'click', 'select'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;

    var onClick = function onClick() {
      if (props.switchable) {
        emit('select');
      }

      emit('click');
    };

    var renderRightIcon = function renderRightIcon() {
      return createVNode(Icon, {
        "name": "edit",
        "class": bem('edit'),
        "onClick": function onClick(event) {
          event.stopPropagation();
          emit('edit');
          emit('click');
        }
      }, null);
    };

    var renderTag = function renderTag() {
      if (props.data.isDefault && props.defaultTagText) {
        return createVNode(Tag, {
          "type": "danger",
          "round": true,
          "class": bem('tag')
        }, {
          default: function _default() {
            return [props.defaultTagText];
          }
        });
      }
    };

    var renderContent = function renderContent() {
      var data = props.data,
          disabled = props.disabled,
          switchable = props.switchable;
      var Info = [createVNode("div", {
        "class": bem('name')
      }, ["".concat(data.name, " ").concat(data.tel), renderTag()]), createVNode("div", {
        "class": bem('address')
      }, [data.address])];

      if (switchable && !disabled) {
        return createVNode(Radio, {
          "name": data.id,
          "iconSize": 18
        }, {
          default: function _default() {
            return [Info];
          }
        });
      }

      return Info;
    };

    return function () {
      var _slots$bottom;

      var disabled = props.disabled;
      return createVNode("div", {
        "class": bem({
          disabled: disabled
        }),
        "onClick": onClick
      }, [createVNode(Cell, {
        "border": false,
        "valueClass": bem('value')
      }, {
        default: renderContent,
        'right-icon': renderRightIcon
      }), (_slots$bottom = slots.bottom) === null || _slots$bottom === void 0 ? void 0 : _slots$bottom.call(slots, _objectSpread(_objectSpread({}, props.data), {}, {
        disabled: disabled
      }))]);
    };
  }
});