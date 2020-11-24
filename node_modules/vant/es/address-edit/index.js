import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { h, ref, watch, computed, nextTick, reactive, createVNode, resolveDirective, vShow, withDirectives } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Utils
import { createNamespace, isObject } from '../utils';
import { isMobile } from '../utils/validate/mobile'; // Composition

import { useExpose } from '../composables/use-expose'; // Components

import Area from '../area';
import Cell from '../cell';
import Field from '../field';
import Popup from '../popup';
import Toast from '../toast';
import Button from '../button';
import Dialog from '../dialog';
import Detail from './Detail';
import Switch from '../switch';

var _createNamespace = createNamespace('address-edit'),
    _createNamespace2 = _slicedToArray(_createNamespace, 3),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1],
    t = _createNamespace2[2];

var defaultData = {
  name: '',
  tel: '',
  country: '',
  province: '',
  city: '',
  county: '',
  areaCode: '',
  postalCode: '',
  addressDetail: '',
  isDefault: false
};

function isPostal(value) {
  return /^\d{6}$/.test(value);
}

export default createComponent({
  props: {
    areaList: Object,
    isSaving: Boolean,
    isDeleting: Boolean,
    validator: Function,
    showDelete: Boolean,
    showPostal: Boolean,
    disableArea: Boolean,
    searchResult: Array,
    telMaxlength: [Number, String],
    showSetDefault: Boolean,
    saveButtonText: String,
    areaPlaceholder: String,
    deleteButtonText: String,
    showSearchResult: Boolean,
    showArea: {
      type: Boolean,
      default: true
    },
    showDetail: {
      type: Boolean,
      default: true
    },
    detailRows: {
      type: [Number, String],
      default: 1
    },
    detailMaxlength: {
      type: [Number, String],
      default: 200
    },
    addressInfo: {
      type: Object,
      default: function _default() {
        return _objectSpread({}, defaultData);
      }
    },
    telValidator: {
      type: Function,
      default: isMobile
    },
    postalValidator: {
      type: Function,
      default: isPostal
    },
    areaColumnsPlaceholder: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  emits: ['save', 'focus', 'delete', 'click-area', 'change-area', 'change-detail', 'cancel-delete', 'select-search', 'change-default'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var areaRef = ref();
    var state = reactive({
      data: {},
      showAreaPopup: false,
      detailFocused: false,
      errorInfo: {
        tel: '',
        name: '',
        areaCode: '',
        postalCode: '',
        addressDetail: ''
      }
    });
    var areaListLoaded = computed(function () {
      return isObject(props.areaList) && Object.keys(props.areaList).length;
    });
    var areaText = computed(function () {
      var _state$data = state.data,
          country = _state$data.country,
          province = _state$data.province,
          city = _state$data.city,
          county = _state$data.county,
          areaCode = _state$data.areaCode;

      if (areaCode) {
        var arr = [country, province, city, county];

        if (province && province === city) {
          arr.splice(1, 1);
        }

        return arr.filter(function (text) {
          return text;
        }).join('/');
      }

      return '';
    }); // hide bottom field when use search && detail get focused

    var hideBottomFields = computed(function () {
      var searchResult = props.searchResult;
      return searchResult && searchResult.length && state.detailFocused;
    });

    var assignAreaValues = function assignAreaValues() {
      if (areaRef.value) {
        var detail = areaRef.value.getArea();
        detail.areaCode = detail.code;
        delete detail.code;

        _extends(state.data, detail);
      }
    };

    var _onFocus = function onFocus(key) {
      state.errorInfo[key] = '';
      state.detailFocused = key === 'addressDetail';
      emit('focus', key);
    };

    var getErrorMessage = function getErrorMessage(key) {
      var value = String(state.data[key] || '').trim();

      if (props.validator) {
        var message = props.validator(key, value);

        if (message) {
          return message;
        }
      }

      switch (key) {
        case 'name':
          return value ? '' : t('nameEmpty');

        case 'tel':
          return props.telValidator(value) ? '' : t('telInvalid');

        case 'areaCode':
          return value ? '' : t('areaEmpty');

        case 'addressDetail':
          return value ? '' : t('addressEmpty');

        case 'postalCode':
          return value && !props.postalValidator(value) ? t('postalEmpty') : '';
      }
    };

    var onSave = function onSave() {
      var items = ['name', 'tel'];

      if (props.showArea) {
        items.push('areaCode');
      }

      if (props.showDetail) {
        items.push('addressDetail');
      }

      if (props.showPostal) {
        items.push('postalCode');
      }

      var isValid = items.every(function (item) {
        var msg = getErrorMessage(item);

        if (msg) {
          state.errorInfo[item] = msg;
        }

        return !msg;
      });

      if (isValid && !props.isSaving) {
        emit('save', state.data);
      }
    };

    var onChangeDetail = function onChangeDetail(val) {
      state.data.addressDetail = val;
      emit('change-detail', val);
    };

    var onAreaConfirm = function onAreaConfirm(values) {
      values = values.filter(function (value) {
        return !!value;
      });

      if (values.some(function (value) {
        return !value.code;
      })) {
        Toast(t('areaEmpty'));
        return;
      }

      state.showAreaPopup = false;
      assignAreaValues();
      emit('change-area', values);
    };

    var onDelete = function onDelete() {
      Dialog.confirm({
        title: t('confirmDelete')
      }).then(function () {
        emit('delete', state.data);
      }).catch(function () {
        emit('cancel-delete', state.data);
      });
    }; // get values of area component


    var getArea = function getArea() {
      return areaRef.value ? areaRef.value.getValues() : [];
    }; // set area code to area component


    var setAreaCode = function setAreaCode(code) {
      state.data.areaCode = code || '';

      if (code) {
        nextTick(assignAreaValues);
      }
    };

    var onDetailBlur = function onDetailBlur() {
      // await for click search event
      setTimeout(function () {
        state.detailFocused = false;
      });
    };

    var setAddressDetail = function setAddressDetail(value) {
      state.data.addressDetail = value;
    };

    var renderSetDefaultCell = function renderSetDefaultCell() {
      if (props.showSetDefault) {
        var _slots = {
          'right-icon': function rightIcon() {
            return createVNode(Switch, {
              "modelValue": state.data.isDefault,
              "onUpdate:modelValue": function onUpdateModelValue($event) {
                return state.data.isDefault = $event;
              },
              "size": "24",
              "onChange": function onChange(event) {
                emit('change-default', event);
              }
            }, null);
          }
        };
        return withDirectives(createVNode(Cell, {
          "center": true,
          "title": t('defaultAddress'),
          "class": bem('default')
        }, _objectSpread({}, _slots)), [[vShow, !hideBottomFields.value]]);
      }

      return h();
    };

    useExpose({
      getArea: getArea,
      setAddressDetail: setAddressDetail
    });
    watch(function () {
      return props.areaList;
    }, function () {
      setAreaCode(state.data.areaCode);
    });
    watch(function () {
      return props.addressInfo;
    }, function (value) {
      state.data = _objectSpread(_objectSpread({}, defaultData), value);
      setAreaCode(value.areaCode);
    }, {
      deep: true,
      immediate: true
    });
    return function () {
      var _slots$default;

      var data = state.data,
          errorInfo = state.errorInfo;
      var disableArea = props.disableArea;
      return createVNode("div", {
        "class": bem()
      }, [createVNode("div", {
        "class": bem('fields')
      }, [createVNode(Field, {
        "modelValue": data.name,
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return data.name = $event;
        },
        "clearable": true,
        "label": t('name'),
        "placeholder": t('namePlaceholder'),
        "errorMessage": errorInfo.name,
        "onFocus": function onFocus() {
          return _onFocus('name');
        }
      }, null), createVNode(Field, {
        "modelValue": data.tel,
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return data.tel = $event;
        },
        "clearable": true,
        "type": "tel",
        "label": t('tel'),
        "maxlength": props.telMaxlength,
        "placeholder": t('telPlaceholder'),
        "errorMessage": errorInfo.tel,
        "onFocus": function onFocus() {
          return _onFocus('tel');
        }
      }, null), withDirectives(createVNode(Field, {
        "readonly": true,
        "label": t('area'),
        "clickable": !disableArea,
        "rightIcon": !disableArea ? 'arrow' : null,
        "modelValue": areaText.value,
        "placeholder": props.areaPlaceholder || t('areaPlaceholder'),
        "errorMessage": errorInfo.areaCode,
        "onFocus": function onFocus() {
          return _onFocus('areaCode');
        },
        "onClick": function onClick() {
          emit('click-area');
          state.showAreaPopup = !disableArea;
        }
      }, null), [[vShow, props.showArea]]), createVNode(Detail, {
        "show": props.showDetail,
        "value": data.addressDetail,
        "focused": state.detailFocused,
        "detailRows": props.detailRows,
        "errorMessage": errorInfo.addressDetail,
        "searchResult": props.searchResult,
        "detailMaxlength": props.detailMaxlength,
        "showSearchResult": props.showSearchResult,
        "onBlur": onDetailBlur,
        "onFocus": function onFocus() {
          return _onFocus('addressDetail');
        },
        "onInput": onChangeDetail,
        "onSelect-search": function onSelectSearch(event) {
          emit('select-search', event);
        }
      }, null), props.showPostal && withDirectives(createVNode(Field, {
        "modelValue": data.postalCode,
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return data.postalCode = $event;
        },
        "type": "tel",
        "maxlength": "6",
        "label": t('postal'),
        "placeholder": t('postal'),
        "errorMessage": errorInfo.postalCode,
        "onFocus": function onFocus() {
          return _onFocus('postalCode');
        }
      }, null), [[vShow, !hideBottomFields.value]]), (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]), renderSetDefaultCell(), withDirectives(createVNode("div", {
        "class": bem('buttons')
      }, [createVNode(Button, {
        "block": true,
        "round": true,
        "loading": props.isSaving,
        "type": "danger",
        "text": props.saveButtonText || t('save'),
        "onClick": onSave
      }, null), props.showDelete && createVNode(Button, {
        "block": true,
        "round": true,
        "loading": props.isDeleting,
        "text": props.deleteButtonText || t('delete'),
        "onClick": onDelete
      }, null)]), [[vShow, !hideBottomFields.value]]), createVNode(Popup, {
        'show': state.showAreaPopup,
        "onUpdate:show": function onUpdateShow($event) {
          return state.showAreaPopup = $event;
        },
        "round": true,
        "teleport": "body",
        "position": "bottom",
        "lazyRender": false
      }, {
        default: function _default() {
          return [createVNode(Area, {
            "ref": areaRef,
            "value": data.areaCode,
            "loading": !areaListLoaded.value,
            "areaList": props.areaList,
            "columnsPlaceholder": props.areaColumnsPlaceholder,
            "onConfirm": onAreaConfirm,
            "onCancel": function onCancel() {
              state.showAreaPopup = false;
            }
          }, null)];
        }
      })]);
    };
  }
});