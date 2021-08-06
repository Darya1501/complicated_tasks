'use strict';

let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
let date = new Date();
let now = date.getDay() - 1;

week.forEach(function(item, i, arr) {
  if (i === now) {
    document.write(`<p><b>${item}</b></p>`);
  } else if (i === 5 || i === 6) {
    document.write(`<p><i>${item}</i></p>`);
  } else {
    document.write(`<p>${item}</p>`);
  }
});
