//Рекурсія та стек
   //Сума всіх чисел до заданого

   function sumTo(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
  }
  
  alert(sumTo(100));

  function sumTo(n) {
   if (n == 1) return 1;
   return n + sumTo(n - 1);
 }
 
 alert(sumTo(100));

 function sumTo(n) {
   return n * (n + 1) / 2;
 }
 
 alert(sumTo(100));
  
  //Обчислення факторіалу
  function factorial(n) {
   return (n != 1) ? n * factorial(n - 1) : 1;
 }
 
 alert(factorial(5)); // 120
 
  //Числа Фібоначчі
  function fib(n) {
   return n <= 1 ? n : fib(n - 1) + fib(n - 2);
 }
 
  //Вивести односпрямований список
  let list1 = {
   value: 1,
   next: {
     value: 2,
     next: {
       value: 3,
       next: {
         value: 4,
         next: null
       }
     }
   }
 };
 
 function printList(list) {
 
   alert(list.value); // вивести поточний елемент
 
   if (list.next) {
     printList(list.next); // виконати те ж саме для решти списку
   }
 
 }
 
 printList(list);

  //Вивести односпрямований список у зворотному порядку
  let list = {
   value: 1,
   next: {
     value: 2,
     next: {
       value: 3,
       next: {
         value: 4,
         next: null
       }
     }
   }
 };
 
 function printReverseList(list) {
 
   if (list.next) {
     printReverseList(list.next);
   }
 
   alert(list.value);
 }
 
 printReverseList(list);

 //Область видимості змінних, замикання
    //Чи підхоплює функція останні зміни?
    let name1 = "John";

    function sayHi() {
      alert("Hi, " + name);
    }
    
    name = "Pete";
    
    sayHi(); // що покаже: "John" або "Pete"? Pete

    //Які змінні доступні?
    function makeWorker() {
     let name = "Pete";
   
     return function() {
       alert(name);
     };
   }
   
   let name = "John";
   
   // створити функцію
   let work = makeWorker();
   
   // викликати її
   work(); // що покаже? Pete

    //Чи є лічильники незалежними?
    function makeCounter() {
     let count = 0;
   
     return function() {
       return count++;
     };
   }
   
   let counter1 = makeCounter();
   let counter2 = makeCounter();
   
   alert(counter()); // 0
   alert(counter()); // 1
   
   alert(counter2()); // 0
   alert(counter2()); // 1

    //Об'єкт лічильника
    function Counter() {
     let count = 0;
   
     this.up = function() {
       return ++count;
     };
   
     this.down = function() {
       return --count;
     };
   }
   
   let counter = new Counter();
   
   alert(counter.up()); // 1
   alert(counter.up()); // 2
   alert(counter.down()); // 1

    //Функція в if
    let phrase = "Hello";

    if (true) {
      let user = "John";
    
      function sayHi() {
        alert(`${phrase}, ${user}`);
      }
    }
    
    sayHi(); //Результат – помилка.

    //Сума із замиканням
    function sum(a) {

     return function(b) {
       return a + b; // бере "a" із зовнішнього лексичного середовища
     };
   
   }
   
   alert(sum(1)(2)); // 3
   alert(sum(5)(-1)); // 4

    //Чи видно змінну?
    let x = 1;

    function func() {
      console.log(x); // ReferenceError: Cannot access 'x' before initialization
      let x = 2;
    }
    
    func(); //результат: помилка
    
    //Фільтрація через функцію
    function inArray(arr) {
     return function(x) {
       return arr.includes(x);
     };
   }
   
   let arr = [1, 2, 3, 4, 5, 6, 7];
   alert(arr.filter(inArray([1, 2, 10]))); // 1,2

    //Сортування за полем
    function byField(fieldName){
     return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
   }

    //Армія функцій
    function makeArmy() {

     let shooters = [];
   
     for(let i = 0; i < 10; i++) {
       let shooter = function() { // функція shooter
         alert(i); // має показати свій номер
       };
       shooters.push(shooter);
     }
   
     return shooters;
   }
   
   let army = makeArmy();
   
   army[0](); // 0
   army[5](); // 5

//Функція як об'єкт, NFE
   //Встановлення і зменшення для лічильника
   function makeCounter() {
     let count = 0;
   
     function counter() {
       return count++;
     }
   
     counter.set = value => count = value;
   
     counter.decrease = () => count--;
   
     return counter;
   }
 
   //Сума із довільною кількістю дужок
   function sum(a) {

     let currentSum = a;
   
     function f(b) {
       currentSum += b;
       return f;
     }
   
     f.toString = function() {
       return currentSum;
     };
   
     return f;
   }
   
//Планування: setTimeout і setInterval
   //setInterval
   function printNumbers(from, to) {
     let current = from;
   
     let timerId = setInterval(function() {
       alert(current);
       if (current == to) {
         clearInterval(timerId);
       }
       current++;
     }, 1000);
   }
   
   // використання:
   printNumbers(5, 10);

   //setTimeout
   function printNumbers(from, to) {
     let current = from;
   
     setTimeout(function go() {
       alert(current);
       if (current < to) {
         setTimeout(go, 1000);
       }
       current++;
     }, 1000);
   }
   
   // використання:
   printNumbers(5, 10);

   //Будь-який setTimeout виконається лише після завершення поточного коду. Змінна i буде останньою: 100000000.
   let i = 0;
   setTimeout(() => alert(i), 100); // 100000000
   
   // припустимо, що час для виконання цієї функції >100мс
   for(let j = 0; j < 100000000; j++) {
     i++;
   }
   
//Декоратори і переадресація, call/apply
  //Декоратор-шпигун
  function spy(func) {

   function wrapper(...args) {
     // використання ...args замість arguments для зберігання "реального" масиву в wrapper.calls
     wrapper.calls.push(args);
     return func.apply(this, args);
   }
 
   wrapper.calls = [];
 
   return wrapper;
 }

//Декоратор із затримкою
function delay(f, ms) {

 return function() {
   setTimeout(() => f.apply(this, arguments), ms);
 };

}

let f100 = delay(alert, 100);

f1000("test"); // покаже "test" через 100мс

function delay(f, ms) {

 return function(...args) {
   let savedThis = this; // зберегти this у проміжній змінній
   setTimeout(function() {
     f.apply(savedThis, args); // використати його тут
   }, ms);
 };

}

//Декоратор дебаунс
function debounce(func, ms) {
 let timeout;
 return function() {
   clearTimeout(timeout);
   timeout = setTimeout(() => func.apply(this, arguments), ms);
 };
}

//Декоратор throttle
function f(a) {
 console.log(a);
}

// f1000 передає виклики f не частіше, ніж раз на 1000 мс
let f1000 = throttle(f, 1000);

f1000(1); // покаже 1
f1000(2); // (затримка, 1000мс ще не пройшли)
f1000(3); // (затримка, 1000мс ще не пройшли)

// коли 1000мс минули...
// виводить 3, проміжне значення 2 ігнорується


//Прив'язка функцій
//Прив'язана функція як метод
function f() {
 alert(this); // null
}

let user2 = {
 g: f.bind(null)
};

user.g();

//Друга прив'язка
function f() {
 alert(this.name);
}

f = f.bind({name: "John"}).bind({name: "Pete"});

f(); // John

//Властивість функції після прив'язки
function sayHi() {
 alert(this.name);
}
sayHi.test = 5;

let bound = sayHi.bind({
 name: "John"
});

alert(bound.test); // Відповідь: undefined.

//Результат bind – це інший об'єкт. Він не має властивості test.


//Виправлення функції, що втрачає "this"
function askPassword(ok, fail) {
 let password = prompt("Password?", '');
 if (password == "rockstar") ok();
 else fail();
}

let user = {
 name: 'John',

 loginOk() {
   alert(`${this.name} увійшов`);
 },

 loginFail() {
   alert(`${this.name} не зміг увійти`);
 },

};

askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
askPassword(() => user.loginOk(), () => user.loginFail());


//Часткове застосування для логіна
askPassword(() => user.login(true), () => user.login(false));
//або
askPassword(user.login.bind(user, true), user.login.bind(user, false));
