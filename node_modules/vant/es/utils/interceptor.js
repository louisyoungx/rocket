import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import { isPromise, noop } from '.';
export function callInterceptor(options) {
  var interceptor = options.interceptor,
      args = options.args,
      done = options.done,
      canceled = options.canceled;

  if (interceptor) {
    var returnVal = interceptor.apply(void 0, _toConsumableArray(args));

    if (isPromise(returnVal)) {
      returnVal.then(function (value) {
        if (value) {
          done();
        } else if (canceled) {
          canceled();
        }
      }).catch(noop);
    } else if (returnVal) {
      done();
    } else if (canceled) {
      canceled();
    }
  } else {
    done();
  }
}