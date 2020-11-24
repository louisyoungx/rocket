"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callInterceptor = callInterceptor;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _ = require(".");

function callInterceptor(options) {
  var interceptor = options.interceptor,
      args = options.args,
      done = options.done,
      canceled = options.canceled;

  if (interceptor) {
    var returnVal = interceptor.apply(void 0, (0, _toConsumableArray2.default)(args));

    if ((0, _.isPromise)(returnVal)) {
      returnVal.then(function (value) {
        if (value) {
          done();
        } else if (canceled) {
          canceled();
        }
      }).catch(_.noop);
    } else if (returnVal) {
      done();
    } else if (canceled) {
      canceled();
    }
  } else {
    done();
  }
}