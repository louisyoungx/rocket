import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { ref, watch, provide, computed, nextTick, reactive, onMounted, createVNode, mergeProps, createTextVNode, resolveDirective } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Utils
import { isDef, trigger, addUnit, isObject, isPromise, isFunction, resetScroll, formatNumber, preventDefault, createNamespace } from '../utils';
import { runSyncRule } from './utils'; // Composition

import { useParent } from '@vant/use';
import { useExpose } from '../composables/use-expose'; // Components

import Icon from '../icon';
import Cell, { cellProps } from '../cell';
import { FORM_KEY } from '../form';

var _createNamespace = createNamespace('field'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export var FIELD_KEY = 'vanField';
export default createComponent({
  props: _objectSpread(_objectSpread({}, cellProps), {}, {
    rows: [Number, String],
    name: String,
    rules: Array,
    disabled: Boolean,
    readonly: Boolean,
    autosize: [Boolean, Object],
    leftIcon: String,
    rightIcon: String,
    clearable: Boolean,
    formatter: Function,
    maxlength: [Number, String],
    labelWidth: [Number, String],
    labelClass: null,
    labelAlign: String,
    inputAlign: String,
    placeholder: String,
    errorMessage: String,
    errorMessageAlign: String,
    showWordLimit: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    error: {
      type: Boolean,
      default: null
    },
    colon: {
      type: Boolean,
      default: null
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    clearTrigger: {
      type: String,
      default: 'focus'
    },
    formatTrigger: {
      type: String,
      default: 'onChange'
    }
  }),
  emits: ['blur', 'focus', 'clear', 'keypress', 'click-input', 'click-left-icon', 'click-right-icon', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var state = reactive({
      focused: false,
      validateFailed: false,
      validateMessage: ''
    });
    var inputRef = ref();
    var childFieldValue = ref();
    var showClear = computed(function () {
      if (props.clearable && !props.readonly) {
        var hasValue = isDef(props.modelValue) && props.modelValue !== '';

        var _trigger = props.clearTrigger === 'always' || props.clearTrigger === 'focus' && state.focused;

        return hasValue && _trigger;
      }
    });
    var formValue = computed(function () {
      if (childFieldValue.value && slots.input) {
        return childFieldValue.value();
      }

      return props.modelValue;
    });

    var runValidator = function runValidator(value, rule) {
      return new Promise(function (resolve) {
        var returnVal = rule.validator(value, rule);

        if (isPromise(returnVal)) {
          return returnVal.then(resolve);
        }

        resolve(returnVal);
      });
    };

    var getRuleMessage = function getRuleMessage(value, rule) {
      var message = rule.message;

      if (isFunction(message)) {
        return message(value, rule);
      }

      return message;
    };

    var runRules = function runRules(rules) {
      return rules.reduce(function (promise, rule) {
        return promise.then(function () {
          if (state.validateFailed) {
            return;
          }

          var value = formValue.value;

          if (rule.formatter) {
            value = rule.formatter(value, rule);
          }

          if (!runSyncRule(value, rule)) {
            state.validateFailed = true;
            state.validateMessage = getRuleMessage(value, rule);
            return;
          }

          if (rule.validator) {
            return runValidator(value, rule).then(function (result) {
              if (result === false) {
                state.validateFailed = true;
                state.validateMessage = getRuleMessage(value, rule);
              }
            });
          }
        });
      }, Promise.resolve());
    };

    var resetValidation = function resetValidation() {
      if (state.validateFailed) {
        state.validateFailed = false;
        state.validateMessage = '';
      }
    };

    var validate = function validate() {
      var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : props.rules;
      return new Promise(function (resolve) {
        if (!rules) {
          resolve();
        }

        resetValidation();
        runRules(rules).then(function () {
          if (state.validateFailed) {
            resolve({
              name: props.name,
              message: state.validateMessage
            });
          } else {
            resolve();
          }
        });
      });
    };

    var _useParent = useParent(FORM_KEY),
        form = _useParent.parent;

    var validateWithTrigger = function validateWithTrigger(trigger) {
      if (form && props.rules) {
        var defaultTrigger = form.props.validateTrigger === trigger;
        var rules = props.rules.filter(function (rule) {
          if (rule.trigger) {
            return rule.trigger === trigger;
          }

          return defaultTrigger;
        });
        validate(rules);
      }
    };

    var updateValue = function updateValue(value) {
      var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'onChange';
      value = isDef(value) ? String(value) : ''; // native maxlength have incorrect line-break counting
      // see: https://github.com/youzan/vant/issues/5033

      var maxlength = props.maxlength,
          modelValue = props.modelValue;

      if (isDef(maxlength) && value.length > maxlength) {
        if (modelValue && modelValue.length === +maxlength) {
          value = modelValue;
        } else {
          value = value.slice(0, maxlength);
        }
      }

      if (props.type === 'number' || props.type === 'digit') {
        var isNumber = props.type === 'number';
        value = formatNumber(value, isNumber, isNumber);
      }

      if (props.formatter && trigger === props.formatTrigger) {
        value = props.formatter(value);
      }

      if (inputRef.value && value !== inputRef.value.value) {
        inputRef.value.value = value;
      }

      if (value !== props.modelValue) {
        emit('update:modelValue', value);
      }
    };

    var onInput = function onInput(event) {
      // skip update value when composing
      if (!event.target.composing) {
        updateValue(event.target.value);
      }
    };

    var focus = function focus() {
      if (inputRef.value) {
        inputRef.value.focus();
      }
    };

    var blur = function blur() {
      if (inputRef.value) {
        inputRef.value.blur();
      }
    };

    var onFocus = function onFocus(event) {
      state.focused = true;
      emit('focus', event); // readonly not work in lagacy mobile safari

      if (props.readonly) {
        blur();
      }
    };

    var onBlur = function onBlur(event) {
      state.focused = false;
      updateValue(props.modelValue, 'onBlur');
      emit('blur', event);
      validateWithTrigger('onBlur');
      resetScroll();
    };

    var onClickInput = function onClickInput(event) {
      emit('click-input', event);
    };

    var onClickLeftIcon = function onClickLeftIcon(event) {
      emit('click-left-icon', event);
    };

    var onClickRightIcon = function onClickRightIcon(event) {
      emit('click-right-icon', event);
    };

    var onClear = function onClear(event) {
      preventDefault(event);
      emit('update:modelValue', '');
      emit('clear', event);
    };

    var showError = computed(function () {
      if (typeof props.error === 'boolean') {
        return props.error;
      }

      if (form && form.props.showError && state.validateFailed) {
        return true;
      }
    });

    var getProp = function getProp(key) {
      if (isDef(props[key])) {
        return props[key];
      }

      if (form && isDef(form.props[key])) {
        return form.props[key];
      }
    };

    var labelStyle = computed(function () {
      var labelWidth = getProp('labelWidth');

      if (labelWidth) {
        return {
          width: addUnit(labelWidth)
        };
      }
    });

    var onKeypress = function onKeypress(event) {
      var ENTER_CODE = 13;

      if (event.keyCode === ENTER_CODE) {
        var submitOnEnter = getProp('submitOnEnter');

        if (!submitOnEnter && props.type !== 'textarea') {
          preventDefault(event);
        } // trigger blur after click keyboard search button


        if (props.type === 'search') {
          blur();
        }
      }

      emit('keypress', event);
    };

    var onCompositionStart = function onCompositionStart(event) {
      event.target.composing = true;
    };

    var onCompositionEnd = function onCompositionEnd(event) {
      var target = event.target;

      if (target.composing) {
        target.composing = false;
        trigger(target, 'input');
      }
    };

    var adjustSize = function adjustSize() {
      var input = inputRef.value;

      if (!(props.type === 'textarea' && props.autosize) || !input) {
        return;
      }

      input.style.height = 'auto';
      var height = input.scrollHeight;

      if (isObject(props.autosize)) {
        var _props$autosize = props.autosize,
            maxHeight = _props$autosize.maxHeight,
            minHeight = _props$autosize.minHeight;

        if (maxHeight) {
          height = Math.min(height, maxHeight);
        }

        if (minHeight) {
          height = Math.max(height, minHeight);
        }
      }

      if (height) {
        input.style.height = height + 'px';
      }
    };

    var renderInput = function renderInput() {
      var inputAlign = getProp('inputAlign');

      if (slots.input) {
        return createVNode("div", {
          "class": bem('control', [inputAlign, 'custom']),
          "onClick": onClickInput
        }, [slots.input()]);
      }

      var inputProps = {
        ref: inputRef,
        name: props.name,
        rows: props.rows,
        class: bem('control', inputAlign),
        value: props.modelValue,
        disabled: props.disabled,
        readonly: props.readonly,
        placeholder: props.placeholder,
        onBlur: onBlur,
        onFocus: onFocus,
        onInput: onInput,
        onClick: onClickInput,
        onChange: onCompositionEnd,
        onKeypress: onKeypress,
        onCompositionend: onCompositionEnd,
        onCompositionstart: onCompositionStart
      };
      var type = props.type;

      if (type === 'textarea') {
        return createVNode("textarea", inputProps, null);
      }

      var inputType = type;
      var inputMode; // type="number" is weired in iOS, and can't prevent dot in Android
      // so use inputmode to set keyboard in mordern browers

      if (type === 'number') {
        inputType = 'text';
        inputMode = 'decimal';
      }

      if (type === 'digit') {
        inputType = 'tel';
        inputMode = 'numeric';
      }

      return createVNode("input", mergeProps({
        "type": inputType,
        "inputmode": inputMode
      }, inputProps), null);
    };

    var renderLeftIcon = function renderLeftIcon() {
      var leftIconSlot = slots['left-icon'];

      if (props.leftIcon || leftIconSlot) {
        return createVNode("div", {
          "class": bem('left-icon'),
          "onClick": onClickLeftIcon
        }, [leftIconSlot ? leftIconSlot() : createVNode(Icon, {
          "name": props.leftIcon,
          "classPrefix": props.iconPrefix
        }, null)]);
      }
    };

    var renderRightIcon = function renderRightIcon() {
      var rightIconSlot = slots['right-icon'];

      if (props.rightIcon || rightIconSlot) {
        return createVNode("div", {
          "class": bem('right-icon'),
          "onClick": onClickRightIcon
        }, [rightIconSlot ? rightIconSlot() : createVNode(Icon, {
          "name": props.rightIcon,
          "classPrefix": props.iconPrefix
        }, null)]);
      }
    };

    var renderWordLimit = function renderWordLimit() {
      if (props.showWordLimit && props.maxlength) {
        var count = (props.modelValue || '').length;
        return createVNode("div", {
          "class": bem('word-limit')
        }, [createVNode("span", {
          "class": bem('word-num')
        }, [count]), createTextVNode("/"), props.maxlength]);
      }
    };

    var renderMessage = function renderMessage() {
      if (form && form.props.showErrorMessage === false) {
        return;
      }

      var message = props.errorMessage || state.validateMessage;

      if (message) {
        var errorMessageAlign = getProp('errorMessageAlign');
        return createVNode("div", {
          "class": bem('error-message', errorMessageAlign)
        }, [message]);
      }
    };

    var renderLabel = function renderLabel() {
      var colon = getProp('colon') ? ':' : '';

      if (slots.label) {
        return [slots.label(), colon];
      }

      if (props.label) {
        return createVNode("span", null, [props.label + colon]);
      }
    };

    useExpose({
      blur: blur,
      focus: focus,
      validate: validate,
      formValue: formValue,
      resetValidation: resetValidation
    });
    provide(FIELD_KEY, {
      childFieldValue: childFieldValue,
      resetValidation: resetValidation,
      validateWithTrigger: validateWithTrigger
    });
    watch(function () {
      return props.modelValue;
    }, function (value) {
      updateValue(value);
      resetValidation();
      validateWithTrigger('onChange');
      nextTick(adjustSize);
    });
    onMounted(function () {
      updateValue(props.modelValue, props.formatTrigger);
      nextTick(adjustSize);
    });
    return function () {
      var _bem;

      var labelAlign = getProp('labelAlign');
      var Label = renderLabel();
      var LeftIcon = renderLeftIcon();
      return createVNode(Cell, {
        "size": props.size,
        "icon": props.leftIcon,
        "class": bem((_bem = {
          error: showError.value,
          disabled: props.disabled
        }, _defineProperty(_bem, "label-".concat(labelAlign), labelAlign), _defineProperty(_bem, 'min-height', props.type === 'textarea' && !props.autosize), _bem)),
        "center": props.center,
        "border": props.border,
        "isLink": props.isLink,
        "required": props.required,
        "clickable": props.clickable,
        "titleStyle": labelStyle.value,
        "valueClass": bem('value'),
        "titleClass": [bem('label', labelAlign), props.labelClass],
        "arrowDirection": props.arrowDirection
      }, {
        default: function _default() {
          return [createVNode("div", {
            "class": bem('body')
          }, [renderInput(), showClear.value && createVNode(Icon, {
            "name": "clear",
            "class": bem('clear'),
            "onTouchstart": onClear
          }, null), renderRightIcon(), slots.button && createVNode("div", {
            "class": bem('button')
          }, [slots.button()])]), renderWordLimit(), renderMessage()];
        },
        icon: LeftIcon ? function () {
          return LeftIcon;
        } : null,
        title: Label ? function () {
          return Label;
        } : null,
        extra: slots.extra
      });
    };
  }
});