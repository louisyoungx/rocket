var camelizeRE = /-(\w)/g;
export function camelize(str) {
  return str.replace(camelizeRE, function (_, c) {
    return c.toUpperCase();
  });
}
export function padZero(num) {
  var targetLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var str = num + '';

  while (str.length < targetLength) {
    str = '0' + str;
  }

  return str;
}