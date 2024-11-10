// Робота з прототипом
let animal1 = {
  jumps: null
};
let rabbit1 = {
  __proto__: animal1,
  jumps: true
};

alert(rabbit1.jumps); // true, взято з rabbit1

delete rabbit1.jumps;

alert(rabbit1.jumps); // null, взято з animal1

delete animal1.jumps;

alert(rabbit1.jumps); // undefined, властивість більше не існує

// Алгоритм пошуку
let head1 = {
  glasses: 1
};
let table1 = {
  pen: 3,
  __proto__: head1
};
let bed1 = {
  sheet: 1,
  pillow: 2,
  __proto__: table1
};
let pockets1 = {
  money: 2000,
  __proto__: bed1
};

alert(pockets1.pen); // 3
alert(bed1.glasses); // 1
alert(table1.money); // undefined

// Куди записує?
let animal2 = {
  eat() {
    this.full = true;
  }
};
let rabbit2 = {
  __proto__: animal2
};

rabbit2.eat(); // результат: rabbit2

// Чому обидва хом'яки ситі?
let hamster = {
  stomach: [],
  eat(food) {
    this.stomach = [food];
  }
};

let speedyHamster = {
  __proto__: hamster
};
let lazyHamster = {
  __proto__: hamster
};

speedyHamster.eat("apple");
alert(speedyHamster.stomach); // apple
alert(lazyHamster.stomach); // пустий

// F.prototype
// Зміна "prototype"
function Rabbit1() {}
Rabbit1.prototype = {
  eats: true
};

let rabbit3 = new Rabbit1();

Rabbit1.prototype = {};

alert(rabbit3.eats); // true

Rabbit1.prototype.eats = false;

alert(rabbit3.eats); // false

delete rabbit3.eats;

alert(rabbit3.eats); // true

delete Rabbit1.prototype.eats;

alert(rabbit3.eats); // undefined

// Створення об'єкта з тим же конструктором
function User1(name) {
  this.name = name;
}

let user1 = new User1('John');
let user2 = new user1.constructor('Pete');

alert(user2.name); // Pete

User1.prototype = {}; // *

let user3 = new User1('John');
let user4 = new user3.constructor('Pete');

alert(user4.name); // undefined

// Нативні прототипи
// Додаємо метод "f.defer(ms)" до функцій
Function.prototype.defer = function(ms) {
  setTimeout(this, ms);
};

function f1() {
  alert("Hello!");
}

f1.defer(1000); // показує "Hello!" через 1 сек

// Додаємо декоратор "defer()" до функцій
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

function f2(a, b) {
  alert(a + b);
}

f2.defer(1000)(1, 2); // показує 3 через 1 сек

// Прототипні методи, об'єкти без __proto__
// Додаємо toString до словника
let dictionary1 = Object.create(null, {
  toString: {
    value() {
      return Object.keys(this).join();
    }
  }
});

dictionary1.apple = "Apple";
dictionary1.__proto__ = "test";

for(let key in dictionary1) {
  alert(key); // "apple", потім "__proto__"
}

alert(dictionary1); // "apple,__proto__"

// Різниця між викликами
function Rabbit3(name) {
  this.name = name;
}
Rabbit3.prototype.sayHi = function() {
  alert(this.name);
}

let rabbit4 = new Rabbit3("Rabbit");

rabbit4.sayHi();                        // Rabbit
Rabbit3.prototype.sayHi();               // undefined
Object.getPrototypeOf(rabbit4).sayHi();  // undefined
rabbit4.__proto__.sayHi();               // undefined
