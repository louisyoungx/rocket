"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = noop;
exports.isDef = isDef;
exports.isFunction = isFunction;
exports.isObject = isObject;
exports.isPromise = isPromise;
exports.get = get;
exports.pick = pick;
exports.inBrowser = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}

var inBrowser = typeof window !== 'undefined';
exports.inBrowser = inBrowser;

function isDef(val) {
  return val !== undefined && val !== null;
} // eslint-disable-next-line @typescript-eslint/ban-types


function isFunction(val) {
  return typeof val === 'function';
}

function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
}

function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

function get(object, path) {
  var keys = path.split('.');
  var result = object;
  keys.forEach(function (key) {
    var _result$key;

    result = (_result$key = result[key]) !== null && _result$key !== void 0 ? _result$key : '';
  });
  return result;
}

function pick(obj, keys) {
  return keys.reduce(function (ret, key) {
    ret[key] = obj[key];
    return ret;
  }, {});
}