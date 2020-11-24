import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { ref, watch, computed, createVNode, resolveDirective } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { pickerProps, PICKER_KEY } from './shared'; // Utils

import { unitToPx, preventDefault, createNamespace } from '../utils';
import { BORDER_UNSET_TOP_BOTTOM } from '../utils/constant'; // Composition

import { useChildren } from '@vant/use';
import { useExpose } from '../composables/use-expose'; // Components

import Loading from '../loading';
import PickerColumn from './PickerColumn';

var _createNamespace = createNamespace('picker'),
    _createNamespace2 = _slicedToArray(_createNamespace, 3),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1],
    t = _createNamespace2[2];

export default createComponent({
  props: _objectSpread(_objectSpread({}, pickerProps), {}, {
    columns: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    defaultIndex: {
      type: [Number, String],
      default: 0
    },
    toolbarPosition: {
      type: String,
      default: 'top'
    },
    valueKey: {
      type: String,
      default: 'text'
    }
  }),
  emits: ['confirm', 'cancel', 'change'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var formattedColumns = ref([]);

    var _useChildren = useChildren(PICKER_KEY),
        children = _useChildren.children,
        linkChildren = _useChildren.linkChildren;

    linkChildren();
    var itemHeight = computed(function () {
      return unitToPx(props.itemHeight);
    });
    var dataType = computed(function () {
      var columns = props.columns;
      var firstColumn = columns[0] || {};

      if (firstColumn.children) {
        return 'cascade';
      }

      if (firstColumn.values) {
        return 'object';
      }

      return 'text';
    });

    var formatCascade = function formatCascade() {
      var formatted = [];
      var cursor = {
        children: props.columns
      };

      while (cursor && cursor.children) {
        var _cursor$defaultIndex;

        var _cursor = cursor,
            _children = _cursor.children;
        var defaultIndex = (_cursor$defaultIndex = cursor.defaultIndex) !== null && _cursor$defaultIndex !== void 0 ? _cursor$defaultIndex : +props.defaultIndex;

        while (_children[defaultIndex] && _children[defaultIndex].disabled) {
          if (defaultIndex < _children.length - 1) {
            defaultIndex++;
          } else {
            defaultIndex = 0;
            break;
          }
        }

        formatted.push({
          values: cursor.children,
          className: cursor.className,
          defaultIndex: defaultIndex
        });
        cursor = _children[defaultIndex];
      }

      formattedColumns.value = formatted;
    };

    var format = function format() {
      var columns = props.columns;

      if (dataType.value === 'text') {
        formattedColumns.value = [{
          values: columns
        }];
      } else if (dataType.value === 'cascade') {
        formatCascade();
      } else {
        formattedColumns.value = columns;
      }
    }; // get indexes of all columns


    var getIndexes = function getIndexes() {
      return children.map(function (child) {
        return child.state.index;
      });
    }; // set options of column by index


    var setColumnValues = function setColumnValues(index, options) {
      var column = children[index];

      if (column) {
        column.setOptions(options);
      }
    };

    var onCascadeChange = function onCascadeChange(columnIndex) {
      var cursor = {
        children: props.columns
      };
      var indexes = getIndexes();

      for (var i = 0; i <= columnIndex; i++) {
        cursor = cursor.children[indexes[i]];
      }

      while (cursor && cursor.children) {
        columnIndex++;
        setColumnValues(columnIndex, cursor.children);
        cursor = cursor.children[cursor.defaultIndex || 0];
      }
    }; // get column instance by index


    var getColumn = function getColumn(index) {
      return children[index];
    }; // get column value by index


    var getColumnValue = function getColumnValue(index) {
      var column = getColumn(index);
      return column && column.getValue();
    }; // set column value by index


    var setColumnValue = function setColumnValue(index, value) {
      var column = getColumn(index);

      if (column) {
        column.setValue(value);

        if (dataType.value === 'cascade') {
          onCascadeChange(index);
        }
      }
    }; // get column option index by column index


    var getColumnIndex = function getColumnIndex(index) {
      return (getColumn(index) || {}).state.index;
    }; // set column option index by column index


    var setColumnIndex = function setColumnIndex(columnIndex, optionIndex) {
      var column = getColumn(columnIndex);

      if (column) {
        column.setIndex(optionIndex);

        if (props.dataType === 'cascade') {
          onCascadeChange(columnIndex);
        }
      }
    }; // get options of column by index


    var getColumnValues = function getColumnValues(index) {
      return (children[index] || {}).state.options;
    }; // get values of all columns


    var getValues = function getValues() {
      return children.map(function (child) {
        return child.getValue();
      });
    }; // set values of all columns


    var setValues = function setValues(values) {
      values.forEach(function (value, index) {
        setColumnValue(index, value);
      });
    }; // set indexes of all columns


    var setIndexes = function setIndexes(indexes) {
      indexes.forEach(function (optionIndex, columnIndex) {
        setColumnIndex(columnIndex, optionIndex);
      });
    };

    var emitAction = function emitAction(event) {
      if (dataType.value === 'text') {
        emit(event, getColumnValue(0), getColumnIndex(0));
      } else {
        emit(event, getValues(), getIndexes());
      }
    };

    var _onChange = function onChange(columnIndex) {
      if (dataType.value === 'cascade') {
        onCascadeChange(columnIndex);
      }

      if (dataType.value === 'text') {
        emit('change', getColumnValue(0), getColumnIndex(0));
      } else {
        emit('change', getValues(), columnIndex);
      }
    };

    var confirm = function confirm() {
      children.forEach(function (child) {
        return child.stopMomentum();
      });
      emitAction('confirm');
    };

    var cancel = function cancel() {
      emitAction('cancel');
    };

    var renderTitle = function renderTitle() {
      if (slots.title) {
        return slots.title();
      }

      if (props.title) {
        return createVNode("div", {
          "class": [bem('title'), 'van-ellipsis']
        }, [props.title]);
      }
    };

    var renderCancel = function renderCancel() {
      var text = props.cancelButtonText || t('cancel');
      return createVNode("button", {
        "type": "button",
        "class": bem('cancel'),
        "onClick": cancel
      }, [slots.cancel ? slots.cancel() : text]);
    };

    var renderConfirm = function renderConfirm() {
      var text = props.confirmButtonText || t('confirm');
      return createVNode("button", {
        "type": "button",
        "class": bem('confirm'),
        "onClick": confirm
      }, [slots.confirm ? slots.confirm() : text]);
    };

    var renderToolbar = function renderToolbar() {
      if (props.showToolbar) {
        return createVNode("div", {
          "class": bem('toolbar')
        }, [slots.default ? slots.default() : [renderCancel(), renderTitle(), renderConfirm()]]);
      }
    };

    var renderColumnItems = function renderColumnItems() {
      return formattedColumns.value.map(function (item, columnIndex) {
        var _item$defaultIndex;

        return createVNode(PickerColumn, {
          "readonly": props.readonly,
          "valueKey": props.valueKey,
          "allowHtml": props.allowHtml,
          "className": item.className,
          "itemHeight": itemHeight.value,
          "defaultIndex": (_item$defaultIndex = item.defaultIndex) !== null && _item$defaultIndex !== void 0 ? _item$defaultIndex : +props.defaultIndex,
          "swipeDuration": props.swipeDuration,
          "visibleItemCount": props.visibleItemCount,
          "initialOptions": item.values,
          "onChange": function onChange() {
            _onChange(columnIndex);
          }
        }, {
          option: slots.option
        });
      });
    };

    var renderColumns = function renderColumns() {
      var wrapHeight = itemHeight.value * props.visibleItemCount;
      var frameStyle = {
        height: "".concat(itemHeight.value, "px")
      };
      var columnsStyle = {
        height: "".concat(wrapHeight, "px")
      };
      var maskStyle = {
        backgroundSize: "100% ".concat((wrapHeight - itemHeight.value) / 2, "px")
      };
      return createVNode("div", {
        "class": bem('columns'),
        "style": columnsStyle,
        "onTouchmove": preventDefault
      }, [renderColumnItems(), createVNode("div", {
        "class": bem('mask'),
        "style": maskStyle
      }, null), createVNode("div", {
        "class": [BORDER_UNSET_TOP_BOTTOM, bem('frame')],
        "style": frameStyle
      }, null)]);
    };

    watch(function () {
      return props.columns;
    }, format, {
      immediate: true
    });
    useExpose({
      confirm: confirm,
      getValues: getValues,
      setValues: setValues,
      getIndexes: getIndexes,
      setIndexes: setIndexes,
      getColumnIndex: getColumnIndex,
      setColumnIndex: setColumnIndex,
      getColumnValue: getColumnValue,
      setColumnValue: setColumnValue,
      getColumnValues: getColumnValues,
      setColumnValues: setColumnValues
    });
    return function () {
      var _slots$columnsTop, _slots$columnsBottom;

      return createVNode("div", {
        "class": bem()
      }, [props.toolbarPosition === 'top' ? renderToolbar() : null, props.loading ? createVNode(Loading, {
        "class": bem('loading')
      }, null) : null, (_slots$columnsTop = slots['columns-top']) === null || _slots$columnsTop === void 0 ? void 0 : _slots$columnsTop.call(slots), renderColumns(), (_slots$columnsBottom = slots['columns-bottom']) === null || _slots$columnsBottom === void 0 ? void 0 : _slots$columnsBottom.call(slots), props.toolbarPosition === 'bottom' ? renderToolbar() : null]);
    };
  }
});