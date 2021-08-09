'use strict';

let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
let hours = ['час', 'часа', 'часов'],
    minuts = ['минута', 'минуты', 'минут'],
    seconds = ['секунда', 'секунды', 'секунд'];

let wordForm = function(num) {
  let n = num % 10;
  if (num >= 5 && num <= 20) {
    return 2; 
  } else if (n === 1) {
    return 0;
  } else if (n >= 2 && n <= 4) {
    return 1;
  } else {
    return 2;
  }
}; // 0 - (1)час, 1 - (2-4)часа, 2 - (5...)часов

let addZero = function(num) {
  if (num < 10) {
    num = '0' + num;
  }
  return num;
};

let printDate = function() {
  document.body.innerHTML = '';

  let date = new Date();

  let dayOfWeek = date.getDay(),
      day = date.getDate(),
      month = date.getMonth(),
      year = date.getFullYear(),
      hour = date.getHours(),
      minute = date.getMinutes(),
      second = date.getSeconds();

  let firstString = `Сегодня ${week[dayOfWeek]}, ${day} ${months[month]} ${year} года, ${hour} ${hours[wordForm(hour)]} ${minute} ${minuts[wordForm(minute)]} ${second} ${seconds[wordForm(second)]}`;

  let secondString = `${addZero(day)}.${addZero(month)}.${year} - ${addZero(hour)}:${addZero(minute)}:${addZero(second)}`;

  document.write(`<p style='color:red; font-family:sans-serif; font-weight: bold'>${firstString}</p>`);
  document.write(`<p style='color:red; font-family:sans-serif; font-weight: bold'>${secondString}</p>`);
};

let timerId = setInterval(printDate, 1000);
printDate();