//Дата та час
  //Створити дату
  let d1 = new Date(2012, 1, 20, 3, 12);
  alert(d1);

  //Показати день тижня
  function getWeekDay(date) {
    let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  
    return days[date.getDay()];
  }
  
  let date = new Date(2014, 0, 3); // 3 січня 2014
  alert(getWeekDay(date)); // FR

  //Європейський день тижня
  function getLocalDay(date) {

    let day = date.getDay();
  
    if (day == 0) { // день тижня 0 (неділя) дорівнює 7 в європейському
      day = 7;
    }
  
    return day;
  }

  //Який день місяця був кілька днів тому?
  function getDateAgo(date, days) {
    let dateCopy = new Date(date);
  
    dateCopy.setDate(date.getDate() - days);
    return dateCopy.getDate();
  }
  
  //Останній день місяця?
  function getLastDayOfMonth(year, month) {
    let date = new Date(year, month + 1, 0);
    return date.getDate();
  }

  //Скільки секунд минуло сьогодні?
  function getSecondsToday() {
    let d = new Date();
    return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
  }
  
  alert(getSecondsToday());

  //Скільки секунд до завтра?
  function getSecondsToTomorrow() {
    let now = new Date();
    let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  
    let diff = tomorrow - now;
    return Math.round(diff / 1000);
  }

  //Форматувати відносну дату
  function formatDate(date) {
    let dayOfMonth = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let diffMs = new Date() - date;
    let diffSec = Math.round(diffMs / 1000);
    let diffMin = diffSec / 60;
    let diffHour = diffMin / 60;
  
    // форматування
    year = year.toString().slice(-2);
    month = month < 10 ? '0' + month : month;
    dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
    hour = hour < 10 ? '0' + hour : hour;
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    if (diffSec < 1) {
      return 'зараз';
    } else if (diffMin < 1) {
      return `${diffSec} сек. тому`
    } else if (diffHour < 1) {
      return `${diffMin} хв. тому`
    } else {
      return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
    }
  }

//Методи JSON, toJSON
  //Перетворити об'єкт у JSON і назад
  let user = {
    name: "John Smith",
    age: 35
  };
  
  let user2 = JSON.parse(JSON.stringify(user));

  //Виключити зворотні посилання
  let room = {
    number: 23
  };
  
  let meetup = {
    title: "Конференція",
    occupiedBy: [{name: "John"}, {name: "Alice"}],
    place: room
  };
  
  room.occupiedBy = meetup;
  meetup.self = meetup;
  
  alert(JSON.stringify(meetup, function replacer(key, value) {
    return (key != "" && value == meetup) ? undefined : value;
  }));
