// Помилка при читанні неіснуючої властивості
let user1 = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      } else {
        throw new ReferenceError(`Property doesn't exist: "${prop}"`);
      }
    }
  });
}

user1 = wrap(user1);

alert(user1.name); // "John"
alert(user1.age); // ReferenceError: Property doesn't exist: "age"

// Доступ до array[-1]
let array = [1, 2, 3];

array = new Proxy(array, {
  get(target, prop, receiver) {
    if (prop < 0) {
      prop = +prop + target.length;
    }
    return Reflect.get(target, prop, receiver);
  }
});

alert(array[-1]); // 3
alert(array[-2]); // 2

// Observable (наблюдач)
let handlers = Symbol('handlers');

function makeObservable(target) {
  target[handlers] = [];

  target.observe = function(handler) {
    this[handlers].push(handler);
  };

  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments);
      if (success) {
        target[handlers].forEach(handler => handler(property, value));
      }
      return success;
    }
  });
}

let user = {};

user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John"; // "SET name=John"

// Eval-калькулятор
function evalCalculator() {
  const expression = prompt("Enter an arithmetic expression:");
  const result = eval(expression);

  alert("The result is: " + result);
  
  return result;
}

evalCalculator();

// Перевірка синтаксису
let user = {
  name: "John",
  go: function() { alert(this.name); }
};

user.go(); // "John"

// Пояснення значення "this"

let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();                  // (1) [object Object]
// Виклик obj.go() напряму через об'єкт obj. 
// Тому `this` вказує на об'єкт `obj`, і результатом буде `[object Object]`.

(obj.go)();                // (2) [object Object]
// Дужки навколо `obj.go` не змінюють контекст виклику. 
// `this` все ще вказує на об'єкт `obj`, тому результат також буде `[object Object]`.

(method = obj.go)();       // (3) undefined
// Метод `obj.go` присвоюється змінній `method`, тобто `method` стає копією функції `go`, 
// але вже не прив'язаною до об'єкта `obj`. 
// При виклику `method()` `this` стає `undefined`, тому результат буде `undefined`.

(obj.go || obj.stop)();    // (4) undefined
// Оператор `||` повертає перше істинне значення, в даному випадку це `obj.go`. 
// Але тепер `obj.go` викликається без контексту `obj`, тож `this` знову стає `undefined`, і результат буде `undefined`.
