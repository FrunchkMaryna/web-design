// Перезаписати promise?
let promise = new Promise(function(resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

promise.then(alert); // Виведе: 1, тому що перший resolve викликає обробник, і наступні ігноруються.


// Затримка з promise
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('виконується через 3 секунди'));


// Анімоване коло з promise
function showCircle(cx, cy, radius) {
  // Створюємо і додаємо коло до документа
  let div = document.createElement('div');
  div.style.width = 0;
  div.style.height = 0;
  div.style.left = cx + 'px';
  div.style.top = cy + 'px';
  div.className = 'circle';
  document.body.append(div);

  // Повертаємо проміс, який виконується після завершення анімації
  return new Promise(resolve => {
    setTimeout(() => {
      div.style.width = radius * 2 + 'px';
      div.style.height = radius * 2 + 'px';

      // Анімація кола
      div.addEventListener('transitionend', () => resolve(div), { once: true });
    }, 0);
  });
}

showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Привіт, світ!");
});


// Promise: then проти catch

// Перший варіант:
promise.then(f1).catch(f2);

// Другий варіант:
promise.then(f1, f2);

// Порівняння:
// - `promise.then(f1).catch(f2);` — `f2` обробить помилки як у початковому `promise`, так і в `f1`.
// - `promise.then(f1, f2);` — `f2` обробить лише помилки початкового `promise`, 
//   але не оброблятиме помилки, що виникли у `f1`.

// Якщо потрібно обробити всі помилки, включно з тими, що можуть виникнути в `f1`, 
// краще використовувати перший варіант: `promise.then(f1).catch(f2);`


// Помилка в setTimeout
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);

// Не спрацює. Коли помилка викидається у setTimeout, вона буде
// розглядатися як неспіймана глобальна помилка, що зазвичай
// призводить до виникнення помилки в консолі, але .catch її не обробить.


// Переписати з використанням async/await
async function loadJson(url) { 
  let response = await fetch(url); 

  if (response.status == 200) {
    let json = await response.json(); 
    return json;
  }

  throw new Error(response.status);
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); 


// Переписати "rethrow" з використанням async/await
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} для ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

// Запит імені користувача до отримання валідного користувача на GitHub
async function demoGithubUser() {
  let user;
  while(true) {
    let name = prompt("Введіть ім'я користувача?", "iliakan");

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; // вихід з циклу, якщо помилки немає
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // цикл продовжиться після alert
        alert("Такого користувача немає, спробуйте ще раз.");
      } else {
        // невідома помилка, перекидаємо її далі
        throw err;
      }
    }
  }

  alert(`Повне ім'я: ${user.name}.`);
  return user;
}

demoGithubUser();


// Виклик async з не-async функції
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // виведе 10 через 1 секунду
  wait().then(result => alert(result));
}

f();
