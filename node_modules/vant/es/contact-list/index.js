import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createVNode, resolveDirective } from "vue";
// Utils
import { createNamespace } from '../utils';
import { RED } from '../utils/constant'; // Components

import Tag from '../tag';
import Icon from '../icon';
import Cell from '../cell';
import Radio from '../radio';
import Button from '../button';
import RadioGroup from '../radio-group';

var _createNamespace = createNamespace('contact-list'),
    _createNamespace2 = _slicedToArray(_createNamespace, 3),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1],
    t = _createNamespace2[2];

export default createComponent({
  props: {
    list: Array,
    addText: String,
    modelValue: null,
    defaultTagText: String
  },
  emits: ['add', 'edit', 'select', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var renderItem = function renderItem(item, index) {
      var onClick = function onClick() {
        emit('update:modelValue', item.id);
        emit('select', item, index);
      };

      var renderRightIcon = function renderRightIcon() {
        return createVNode(Radio, {
          "name": item.id,
          "iconSize": 16,
          "checkedColor": RED
        }, null);
      };

      var renderLeftIcon = function renderLeftIcon() {
        return createVNode(Icon, {
          "name": "edit",
          "class": bem('edit'),
          "onClick": function onClick(event) {
            event.stopPropagation();
            emit('edit', item, index);
          }
        }, null);
      };

      var renderContent = function renderContent() {
        var nodes = ["".concat(item.name, "\uFF0C").concat(item.tel)];

        if (item.isDefault && props.defaultTagText) {
          nodes.push(createVNode(Tag, {
            "type": "danger",
            "round": true,
            "class": bem('item-tag')
          }, {
            default: function _default() {
              return [props.defaultTagText];
            }
          }));
        }

        return nodes;
      };

      return createVNode(Cell, {
        "key": item.id,
        "isLink": true,
        "center": true,
        "class": bem('item'),
        "valueClass": bem('item-value'),
        "onClick": onClick
      }, {
        icon: renderLeftIcon,
        default: renderContent,
        'right-icon': renderRightIcon
      });
    };

    return function () {
      return createVNode("div", {
        "class": bem()
      }, [createVNode(RadioGroup, {
        "modelValue": props.modelValue,
        "class": bem('group')
      }, {
        default: function _default() {
          return [props.list && props.list.map(renderItem)];
        }
      }), createVNode("div", {
        "class": bem('bottom')
      }, [createVNode(Button, {
        "round": true,
        "block": true,
        "type": "danger",
        "class": bem('add'),
        "text": props.addText || t('addText'),
        "onClick": function onClick() {
          emit('add');
        }
      }, null)])]);
    };
  }
});