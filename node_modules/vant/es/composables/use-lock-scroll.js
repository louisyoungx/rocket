var count = 0;
var CLASSNAME = 'van-overflow-hidden';
export function useLockScroll(shouldLock) {
  var lock = function lock() {
    if (shouldLock()) {
      if (!count) {
        document.body.classList.add(CLASSNAME);
      }

      count++;
    }
  };

  var unlock = function unlock() {
    if (shouldLock() && count) {
      count--;

      if (!count) {
        document.body.classList.remove(CLASSNAME);
      }
    }
  };

  return [lock, unlock];
}