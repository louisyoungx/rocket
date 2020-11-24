import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { ref, createVNode, resolveDirective, Fragment, mergeProps } from "vue";
// Utils
import { createNamespace } from '../utils';
import { isAndroid } from '../utils/validate/system'; // Components

import Cell from '../cell';
import Field from '../field';

var _createNamespace = createNamespace('address-edit-detail'),
    _createNamespace2 = _slicedToArray(_createNamespace, 3),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1],
    t = _createNamespace2[2];

var android = isAndroid();
export default createComponent({
  props: {
    show: Boolean,
    value: String,
    errorMessage: String,
    focused: Boolean,
    detailRows: [Number, String],
    searchResult: Array,
    detailMaxlength: [Number, String],
    showSearchResult: Boolean
  },
  emits: ['blur', 'focus', 'input', 'select-search'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var field = ref();

    var showSearchResult = function showSearchResult() {
      return props.focused && props.searchResult && props.showSearchResult;
    };

    var onSelect = function onSelect(express) {
      emit('select-search', express);
      emit('input', "".concat(express.address || '', " ").concat(express.name || '').trim());
    };

    var onFinish = function onFinish() {
      field.value.blur();
    };

    var renderFinish = function renderFinish() {
      if (props.value && props.focused && android) {
        return createVNode("div", {
          "class": bem('finish'),
          "onClick": onFinish
        }, [t('complete')]);
      }
    };

    var renderSearchTitle = function renderSearchTitle(express) {
      if (express.name) {
        var text = express.name.replace(props.value, "<span class=".concat(bem('keyword'), ">").concat(props.value, "</span>"));
        return createVNode("div", {
          "innerHTML": text
        }, null);
      }
    };

    var renderSearchResult = function renderSearchResult() {
      if (!showSearchResult()) {
        return;
      }

      var searchResult = props.searchResult;
      return searchResult.map(function (express) {
        return createVNode(Cell, {
          "clickable": true,
          "key": express.name + express.address,
          "icon": "location-o",
          "label": express.address,
          "class": bem('search-item'),
          "border": false,
          "onClick": function onClick() {
            onSelect(express);
          }
        }, {
          title: function title() {
            return renderSearchTitle(express);
          }
        });
      });
    };

    var onFocus = function onFocus(event) {
      emit('focus', event);
    };

    var onBlur = function onBlur(event) {
      emit('blur', event);
    };

    var onInput = function onInput(value) {
      emit('input', value);
    };

    return function () {
      if (props.show) {
        return createVNode(Fragment, null, [createVNode(Field, mergeProps({
          "autosize": true,
          "ref": field,
          "class": bem(),
          "rows": props.detailRows,
          "type": "textarea",
          "label": t('label'),
          "border": !showSearchResult(),
          "clearable": !android,
          "maxlength": props.detailMaxlength,
          "modelValue": props.value,
          "placeholder": t('placeholder'),
          "errorMessage": props.errorMessage,
          "onBlur": onBlur,
          "onFocus": onFocus
        }, {
          'onUpdate:modelValue': onInput
        }), {
          icon: renderFinish
        }), renderSearchResult()]);
      }
    };
  }
});