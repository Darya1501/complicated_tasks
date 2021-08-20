const DayOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const now = new Date();
const newYear = new Date(2022, 0, 1);


const getTimesOfDay = function(date) {
  const hour = date.getHours();
  if (hour < 4) {
    return 'Доброй ночи!';
  } else if (hour < 12) {
    return 'Доброе утро!';
  } else if (hour < 17) {
    return 'Добрый день!';
  } else if (hour < 24) {
    return 'Добрый вечер!';
  } else {
    return 'Доброй ночи!';
  }
};

const wordForm = function(num) {
  const n = num % 10;
  if (num >= 5 && num <= 20) {
    return 'дней';
  } else if (n === 1) {
    return 'день';
  } else if (n >= 2 && n <= 4) {
    return 'дня';
  } else {
    return 'дней';
  }
};

const difference = Math.floor(((newYear.getTime() - now.getTime()) / 24 / 60 / 60 / 1000));

const string =
` <p>${getTimesOfDay(24)} <br>
Сегодня: ${DayOfWeek[now.getDay()]} <br>
Текущее время: ${now.toLocaleTimeString('en-US')} <br>
До нового года осталось ${difference} ${wordForm(difference)}</p> `;

document.body.innerHTML = string;


