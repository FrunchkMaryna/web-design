// Об'єкти
// Завдання 1: Привіт, об'єкт
let person = {};
person.firstName = "John";
person.lastName = "Smith";
person.firstName = "Pete";
delete person.firstName;

// Завдання 2: Перевірка на порожнечу
function isObjectEmpty(obj) {
  for (let prop in obj) {
    // Якщо цикл почався, то властивість існує
    return false;
  }
  return true;
}

// Завдання 3: Сума властивостей об'єкта
let employeeSalaries = {
  John: 100,
  Ann: 160,
  Pete: 130
};

let totalSalary = 0;
for (let employee in employeeSalaries) {
  totalSalary += employeeSalaries[employee];
}

alert(totalSalary); // 390

// Завдання 4: Помножити числові значення властивостей на 2
function doubleNumericProperties(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'number') {
      obj[key] *= 2;
    }
  }
}

// Методи об'єктів, "this"
// Завдання 1: Використання "this" в об'єкті
function createUser() {
  return {
    name: "John",
    ref: this
  };
}

let userExample = createUser();

alert(userExample.ref.name); // Помилка: Не вдається прочитати властивість 'name' від undefined

// Завдання 2: Створення калькулятора
let simpleCalculator = {
  sum() {
    return this.x + this.y;
  },

  multiply() {
    return this.x * this.y;
  },

  read() {
    this.x = +prompt('x?', 0);
    this.y = +prompt('y?', 0);
  }
};

simpleCalculator.read();
alert(simpleCalculator.sum());
alert(simpleCalculator.multiply());

// Завдання 3: Ланцюжок викликів
let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep() {
    alert(this.step);
    return this;
  }
};

ladder.up().up().down().showStep().down().showStep(); // показує 1, потім 0

// Конструктор, оператор "new"
// Завдання 1: Дві функції – один об'єкт
let sharedObject = {};

function X() { return sharedObject; }
function Y() { return sharedObject; }

alert(new X() == new Y()); // true

// Завдання 2: Створення нового Калькулятора
function Calculator() {

  this.read = function() {
    this.a = +prompt('a?', 0);
    this.b = +prompt('b?', 0);
  };

  this.add = function() {
    return this.a + this.b;
  };

  this.multiply = function() {
    return this.a * this.b;
  };
}

let calc = new Calculator();
calc.read();

alert("Сума=" + calc.add());
alert("Множення=" + calc.multiply());

// Завдання 3: Створення нового Акумулятора
function Accumulator(initialValue) {
  this.value = initialValue;

  this.read = function() {
    this.value += +prompt('Скільки додати?', 0);
  };
}

let accum = new Accumulator(1);
accum.read();
accum.read();
alert(accum.value);
