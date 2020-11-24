import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createVNode } from "vue";
import { createNamespace } from '../utils';
import Cell from '../cell';

var _createNamespace = createNamespace('contact-card'),
    _createNamespace2 = _slicedToArray(_createNamespace, 3),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1],
    t = _createNamespace2[2];

export default createComponent({
  props: {
    tel: String,
    name: String,
    addText: String,
    editable: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'add'
    }
  },
  emits: ['click'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var onClick = function onClick(event) {
      if (props.editable) {
        emit('click', event);
      }
    };

    var renderContent = function renderContent() {
      if (props.type === 'add') {
        return props.addText || t('addText');
      }

      return [createVNode("div", null, ["".concat(t('name'), "\uFF1A").concat(props.name)]), createVNode("div", null, ["".concat(t('tel'), "\uFF1A").concat(props.tel)])];
    };

    return function () {
      return createVNode(Cell, {
        "center": true,
        "icon": props.type === 'edit' ? 'contact' : 'add-square',
        "class": bem([props.type]),
        "border": false,
        "isLink": props.editable,
        "valueClass": bem('value'),
        "onClick": onClick
      }, {
        default: function _default() {
          return [renderContent()];
        }
      });
    };
  }
});