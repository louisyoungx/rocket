import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { resolveDirective, createVNode } from "vue";
// Utils
import { createNamespace } from '../utils'; // Components

import Button from '../button';
import RadioGroup from '../radio-group';
import AddressItem from './Item';

var _createNamespace = createNamespace('address-list'),
    _createNamespace2 = _slicedToArray(_createNamespace, 3),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1],
    t = _createNamespace2[2];

export default createComponent({
  props: {
    list: Array,
    modelValue: [Number, String],
    disabledList: Array,
    disabledText: String,
    addButtonText: String,
    defaultTagText: String,
    switchable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['add', 'edit', 'select', 'click-item', 'edit-disabled', 'select-disabled', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;

    var renderItem = function renderItem(item, index, disabled) {
      var onEdit = function onEdit() {
        var name = disabled ? 'edit-disabled' : 'edit';
        emit(name, item, index);
      };

      var onClick = function onClick() {
        emit('click-item', item, index);
      };

      var onSelect = function onSelect() {
        var name = disabled ? 'select-disabled' : 'select';
        emit(name, item, index);

        if (!disabled) {
          emit('update:modelValue', item.id);
        }
      };

      return createVNode(AddressItem, {
        "key": item.id,
        "data": item,
        "disabled": disabled,
        "switchable": props.switchable,
        "defaultTagText": props.defaultTagText,
        "onEdit": onEdit,
        "onClick": onClick,
        "onSelect": onSelect
      }, {
        bottom: slots['item-bottom']
      });
    };

    var renderList = function renderList(list, disabled) {
      if (list) {
        return list.map(function (item, index) {
          return renderItem(item, index, disabled);
        });
      }
    };

    var renderBottom = function renderBottom() {
      var onClick = function onClick() {
        emit('add');
      };

      return createVNode("div", {
        "class": bem('bottom')
      }, [createVNode(Button, {
        "round": true,
        "block": true,
        "type": "danger",
        "text": props.addButtonText || t('add'),
        "class": bem('add'),
        "onClick": onClick
      }, null)]);
    };

    return function () {
      var _slots$top, _slots$default;

      var List = renderList(props.list);
      var DisabledList = renderList(props.disabledList, true);
      var DisabledText = props.disabledText && createVNode("div", {
        "class": bem('disabled-text')
      }, [props.disabledText]);
      return createVNode("div", {
        "class": bem()
      }, [(_slots$top = slots.top) === null || _slots$top === void 0 ? void 0 : _slots$top.call(slots), createVNode(RadioGroup, {
        "modelValue": props.modelValue
      }, {
        default: function _default() {
          return [List];
        }
      }), DisabledText, DisabledList, (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots), renderBottom()]);
    };
  }
});