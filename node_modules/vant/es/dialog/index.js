import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { inBrowser } from '../utils';
import { mountComponent, usePopupState } from '../utils/mount-component';
import VanDialog from './Dialog';
var instance;

function initInstance() {
  var Wrapper = {
    setup: function setup() {
      var _usePopupState = usePopupState(),
          state = _usePopupState.state,
          toggle = _usePopupState.toggle;

      return function () {
        return createVNode(VanDialog, _objectSpread(_objectSpread({}, state), {}, {
          'onUpdate:show': toggle
        }), null);
      };
    }
  };

  var _mountComponent = mountComponent(Wrapper);

  instance = _mountComponent.instance;
}

function Dialog(options) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return Promise.resolve();
  }

  return new Promise(function (resolve, reject) {
    if (!instance) {
      initInstance();
    }

    instance.open(_objectSpread(_objectSpread(_objectSpread({}, Dialog.currentOptions), options), {}, {
      callback: function callback(action) {
        (action === 'confirm' ? resolve : reject)(action);
      }
    }));
  });
}

Dialog.defaultOptions = {
  title: '',
  width: '',
  theme: null,
  message: '',
  overlay: true,
  callback: null,
  teleport: 'body',
  className: '',
  allowHtml: false,
  lockScroll: true,
  transition: 'van-dialog-bounce',
  beforeClose: null,
  overlayClass: '',
  overlayStyle: null,
  messageAlign: '',
  cancelButtonText: '',
  cancelButtonColor: null,
  confirmButtonText: '',
  confirmButtonColor: null,
  showConfirmButton: true,
  showCancelButton: false,
  closeOnPopstate: true,
  closeOnClickOverlay: false
};
Dialog.alert = Dialog;

Dialog.confirm = function (options) {
  return Dialog(_objectSpread({
    showCancelButton: true
  }, options));
};

Dialog.close = function () {
  if (instance) {
    instance.toggle(false);
  }
};

Dialog.setDefaultOptions = function (options) {
  _extends(Dialog.currentOptions, options);
};

Dialog.resetDefaultOptions = function () {
  Dialog.currentOptions = _objectSpread({}, Dialog.defaultOptions);
};

Dialog.resetDefaultOptions();

Dialog.install = function (app) {
  app.use(VanDialog);
  app.config.globalProperties.$dialog = Dialog;
};

Dialog.Component = VanDialog;
export default Dialog;