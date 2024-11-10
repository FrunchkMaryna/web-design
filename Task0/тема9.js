// Переписати на клас
class Clock {
  constructor({ template }) {
    this.template = template;
  }

  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    let output = this.template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    console.log(output);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}

let clock1 = new Clock({ template: 'h:m:s' });
clock1.start();


// Помилка при створенні екземпляра
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Rabbit1 extends Animal {
  constructor(name) {
    super(name);
    this.created = Date.now();
  }
}

let rabbit1 = new Rabbit1("White Rabbit");
alert(rabbit1.name);


// Розширений годинник
class ExtendedClock extends Clock {
  constructor(options) {
    super(options);
    let { precision = 1000 } = options;
    this.precision = precision;
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), this.precision);
  }
};


// Клас, що успадковує Object
class Rabbit2 extends Object {
  constructor(name) {
    super();
    this.name = name;
  }
}

let rabbit2 = new Rabbit2("Rab");

alert(rabbit2.hasOwnProperty('name')); // true

class Rabbit3 extends Object {}

alert(Rabbit3.prototype.__proto__ === Object.prototype); // (1) true
alert(Rabbit3.__proto__ === Object); // (2) true

class Rabbit4 extends Object {}

// зазвичай ми використовуємо Object.getOwnPropertyNames
alert(Object.getOwnPropertyNames({ a: 1, b: 2 })); // "a,b"

class Rabbit5 {}

alert(Rabbit5.prototype.__proto__ === Object.prototype); // (1) true
alert(Rabbit5.__proto__ === Object); // (2) false
alert(Rabbit5.__proto__ === Function.prototype); // за замовчуванням, як будь-яка функція

// помилка, немає такої функції в Rabbit
// alert(Rabbit5.getOwnPropertyNames({ a: 1, b: 2 })); // Помилка


// Дивний instanceof
function A() {}
function B() {}

// Відокремлюємо прототипи A і B
A.prototype = {}; // Новий порожній об'єкт як прототип A
B.prototype = {}; // Новий порожній об'єкт як прототип B

let a = new A();

console.log(a instanceof A); // true
console.log(a instanceof B); // false
