"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FORM_KEY = void 0;

var _vue = require("vue");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _use = require("@vant/use");

var _useExpose = require("../composables/use-expose");

var _createNamespace = (0, _utils.createNamespace)('form'),
    _createNamespace2 = (0, _slicedToArray2.default)(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

var FORM_KEY = 'vanForm';
exports.FORM_KEY = FORM_KEY;

var _default = createComponent({
  props: {
    colon: Boolean,
    labelWidth: [Number, String],
    labelAlign: String,
    inputAlign: String,
    scrollToError: Boolean,
    validateFirst: Boolean,
    errorMessageAlign: String,
    submitOnEnter: {
      type: Boolean,
      default: true
    },
    validateTrigger: {
      type: String,
      default: 'onBlur'
    },
    showError: {
      type: Boolean,
      default: true
    },
    showErrorMessage: {
      type: Boolean,
      default: true
    }
  },
  emits: ['submit', 'failed'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var _useChildren = (0, _use.useChildren)(FORM_KEY),
        children = _useChildren.children,
        linkChildren = _useChildren.linkChildren;

    var validateSeq = function validateSeq() {
      return new Promise(function (resolve, reject) {
        var errors = [];
        children.reduce(function (promise, field) {
          return promise.then(function () {
            if (!errors.length) {
              return field.validate().then(function (error) {
                if (error) {
                  errors.push(error);
                }
              });
            }
          });
        }, Promise.resolve()).then(function () {
          if (errors.length) {
            reject(errors);
          } else {
            resolve();
          }
        });
      });
    };

    var validateAll = function validateAll() {
      return new Promise(function (resolve, reject) {
        Promise.all(children.map(function (item) {
          return item.validate();
        })).then(function (errors) {
          errors = errors.filter(function (item) {
            return item;
          });

          if (errors.length) {
            reject(errors);
          } else {
            resolve();
          }
        });
      });
    };

    var validateField = function validateField(name) {
      var matched = children.filter(function (item) {
        return item.name === name;
      });

      if (matched.length) {
        return new Promise(function (resolve, reject) {
          matched[0].validate().then(function (error) {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      }

      return Promise.reject();
    };

    var validate = function validate(name) {
      if (name) {
        return validateField(name);
      }

      return props.validateFirst ? validateSeq() : validateAll();
    };

    var resetValidation = function resetValidation(name) {
      children.forEach(function (item) {
        if (!name || item.name === name) {
          item.resetValidation();
        }
      });
    };

    var scrollToField = function scrollToField(name, options) {
      children.some(function (item) {
        if (item.name === name) {
          item.$el.scrollIntoView(options);
          return true;
        }

        return false;
      });
    };

    var getValues = function getValues() {
      return children.reduce(function (form, field) {
        form[field.name] = field.formValue.value;
        return form;
      }, {});
    };

    var submit = function submit() {
      var values = getValues();
      validate().then(function () {
        emit('submit', values);
      }).catch(function (errors) {
        emit('failed', {
          values: values,
          errors: errors
        });

        if (props.scrollToError) {
          scrollToField(errors[0].name);
        }
      });
    };

    var onSubmit = function onSubmit(event) {
      event.preventDefault();
      submit();
    };

    linkChildren({
      props: props
    });
    (0, _useExpose.useExpose)({
      submit: submit,
      validate: validate,
      scrollToField: scrollToField,
      resetValidation: resetValidation
    });
    return function () {
      var _slots$default;

      return (0, _vue.createVNode)("form", {
        "class": bem(),
        "onSubmit": onSubmit
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);
    };
  }
});

exports.default = _default;