'use strict';

function mixin(behavior, sharedBehavior = {}) {
  const instanceKeys = Reflect.ownKeys(behavior);
  const sharedKeys = Reflect.ownKeys(sharedBehavior);
  const typeTag = Symbol('isa');

  function _mixin(clazz) {
    for (let property of instanceKeys) {
      Object.defineProperty(clazz.prototype, property, {value: behavior[property]});
    }
    Object.defineProperty(clazz.prototype, typeTag, {value: true});
    return clazz;
  }

  for (let property of sharedKeys) {
    Object.defineProperty(_mixin, property, {
      value: sharedBehavior[property],
      enumerable: sharedBehavior.propertyIsEnumerable(property)
    });
  }
  Object.defineProperty(_mixin, Symbol.hasInstance, {
    value: (i) => !!i[typeTag]
  });
  return _mixin;
}

const SuperPowers = mixin({
  addPower(name) {
    this.powers().push(name);
    return this;
  },
  powers() {
    return this._powers_pocessed || (this._powers_pocessed = []);
  }
});

const UtilityBelt = mixin({
  addToBelt(name) {
    this.utilities().push(name);
    return this;
  },
  utilities() {
    return this._utility_items || (this._utility_items = []);
  }
});

@SuperPowers
@UtilityBelt
class ComicBookCharacter {
  constructor(first, last) {
    this.firstName = first;
    this.lastName = last;
  }
  realName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const batman = new ComicBookCharacter('Bruce', 'Wayne');
console.log(batman.realName());
console.log(batman.utilities());
console.log(batman.powers());

batman
  .addToBelt('batarang')
  .addToBelt('cape');

console.log(batman.utilities());

batman
  .addPower('detective')
  .addPower('voice sounds like Collum has asthma');

console.log(batman.powers());
