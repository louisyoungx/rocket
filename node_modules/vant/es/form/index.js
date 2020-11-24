import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createVNode } from "vue";
import { createNamespace } from '../utils';
import { useChildren } from '@vant/use';
import { useExpose } from '../composables/use-expose';

var _createNamespace = createNamespace('form'),
    _createNamespace2 = _slicedToArray(_createNamespace, 2),
    createComponent = _createNamespace2[0],
    bem = _createNamespace2[1];

export var FORM_KEY = 'vanForm';
export default createComponent({
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

    var _useChildren = useChildren(FORM_KEY),
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
    useExpose({
      submit: submit,
      validate: validate,
      scrollToField: scrollToField,
      resetValidation: resetValidation
    });
    return function () {
      var _slots$default;

      return createVNode("form", {
        "class": bem(),
        "onSubmit": onSubmit
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)]);
    };
  }
});