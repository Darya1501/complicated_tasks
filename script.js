'use strict';

const books = document.querySelectorAll('.book');
console.log('books: ', books);

// Восстановить порядок книг
books[1].after(books[0]);
books[5].after(books[2]);
books[4].after(books[3]);

// Заменить картинку фона
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

// Исправить заголовок в книге 3
const titleTexts = document.querySelectorAll('.book > h2 > a');
titleTexts[2].textContent = 'Книга 3. this и Прототипы Объектов';

// Удалить рекламу со страницы
const adv = document.querySelector('.adv');
adv.remove();

// Восстановить порядок глав во второй и пятой книге 
books[0].classList.add('book_2');
books[5].classList.add('book_5');

const chapters2 = document.querySelectorAll('.book_2 > ul > li');
chapters2[3].after(chapters2[6]);
chapters2[6].after(chapters2[8]);
chapters2[9].after(chapters2[2]);

const chapters5 = document.querySelectorAll('.book_5 > ul > li');
chapters5[1].after(chapters5[9]);
chapters5[4].after(chapters5[2]);
chapters5[7].after(chapters5[5]);

// в шестой книге добавить главу 8
books[2].classList.add('book_6');

const chapters6 = document.querySelectorAll('.book_6 > ul > li');
chapters6[8].insertAdjacentHTML('afterend', '<li>Глава 8: За пределами ES6</li>');

