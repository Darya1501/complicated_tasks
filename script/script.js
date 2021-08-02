// Урок 2
let num = 266219;
let total = 1;
let remainder;

while (num > 0) { 
  remainder = num % 10;
  total *= remainder;
  num = (num - remainder) / 10;
}
console.log('Произведение цифр числа 266219:', total);

console.log(total + ' в третьей степени = ' + total ** 3);

console.log('Первые две цифры числа', total, '-', total.toString().slice(0, 2));

// Урок 3 - задание 1
let lang = prompt('Введите язык (ru/en): ');

while ((lang !== 'ru') && (lang !== 'en')) {
  lang = prompt('Неверный ввод. Введите "ru" или "en": ');
}

let ruDays = 'Понедельник, Вторник, Среда, четверг, Пятница, Суббота, Воскресенье';
let enDays = 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday';

if (lang === 'ru') {
  console.log(ruDays);
} else if(lang === 'en') {
  console.log(enDays);
}

switch(lang) {
  case 'ru':
    console.log(ruDays);
    break;
  case 'en':
    console.log(enDays);
    break;
}

let days = [ ['ru', 'en'], [ruDays, enDays] ];
console.log( days[1][days[0].indexOf(lang)] );

// Урок 3 - задание 2
let namePerson = prompt('Введите имя: ');

let result = (namePerson === 'Артем') ? 'Директор' : (namePerson === 'Максим') ? 'Преподаватель' : 'Студент';

console.log('Привет, ', result);