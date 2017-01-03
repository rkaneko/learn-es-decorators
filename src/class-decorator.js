'use strict';

const assert = require('assert');

function superhero(isSuperhero = true) {
  return function(target) {
    target.isSuperhero = isSuperhero;
  }
}

@superhero()
class MySuperHero {};

console.log(MySuperHero.isSuperhero);
assert(MySuperHero.isSuperhero);

@superhero(false)
class MyNotSuperHero {};

console.log(MyNotSuperHero.isSuperhero);
assert(!MyNotSuperHero.isSuperhero);
