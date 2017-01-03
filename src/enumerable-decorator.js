'use strict';

class C {
  @enumerable(false)
  method() {}
}

function enumerable(value) {
  return function (target, key, descriptor) {
    descriptor.enumerable = value;
    return descriptor;
  }
}
