import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createVNode } from "vue";
import { createNamespace, addUnit } from '../utils';
import { useLinkField } from '../composables/use-link-field';
import Loading from '../loading';

var _createNamespace = createNamespace('switch'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export default createComponent({
  props: {
    size: [Number, String],
    loading: Boolean,
    disabled: Boolean,
    modelValue: null,
    activeColor: String,
    inactiveColor: String,
    activeValue: {
      type: null,
      default: true
    },
    inactiveValue: {
      type: null,
      default: false
    }
  },
  emits: ['change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var isChecked = function isChecked() {
      return props.modelValue === props.activeValue;
    };

    var onClick = function onClick() {
      if (!props.disabled && !props.loading) {
        var newValue = isChecked() ? props.inactiveValue : props.activeValue;
        emit('update:modelValue', newValue);
        emit('change', newValue);
      }
    };

    var renderLoading = function renderLoading() {
      if (props.loading) {
        var color = isChecked() ? props.activeColor : props.inactiveColor;
        return createVNode(Loading, {
          "class": bem('loading'),
          "color": color
        }, null);
      }
    };

    useLinkField(function () {
      return props.modelValue;
    });
    return function () {
      var size = props.size,
          loading = props.loading,
          disabled = props.disabled,
          activeColor = props.activeColor,
          inactiveColor = props.inactiveColor;
      var checked = isChecked();
      var style = {
        fontSize: addUnit(size),
        backgroundColor: checked ? activeColor : inactiveColor
      };
      return createVNode("div", {
        "role": "switch",
        "class": bem({
          on: checked,
          loading: loading,
          disabled: disabled
        }),
        "style": style,
        "aria-checked": checked,
        "onClick": onClick
      }, [createVNode("div", {
        "class": bem('node')
      }, [renderLoading()])]);
    };
  }
});