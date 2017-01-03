'use strict';

const assert = require('assert');

class Cat {
  constructor(name) {
    this._name = name;
  }
  meow() { return `${this._name} says Meow!`; }
  get name() { return `I'm ${this._name}.`; }
  set name(value) {
    assert(typeof value === 'string');
    assert(!!value);
    this._name = value;
  }
}

const cat = new Cat('mike');
let descriptor = Object.getOwnPropertyDescriptor(Cat.prototype, 'meow');
console.dir(descriptor);
assert(descriptor.writable === true);

function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

descriptor = readonly(Cat.prototype, 'meow', descriptor) || descriptor;
Object.defineProperty(Cat.prototype, 'meow', descriptor);

console.dir(Object.getOwnPropertyDescriptor(Cat.prototype, 'meow'));

assert(descriptor.writable === false);

// cannot assign to read only property
cat.meow = function() {
  console.error('cannot write');
};
