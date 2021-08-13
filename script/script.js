'use strict';

const textColor = document.getElementById('color');
const button = document.getElementById('change');
const wrapper = document.querySelector('.wrapper');

let color = textColor.textContent;
wrapper.style.backgroundColor = color;

let setRandomColor = function() {
  let color = '#' + Math.floor(Math.random()*16777215).toString(16);
  textColor.textContent = color;
  wrapper.style.backgroundColor = color;
};

button.addEventListener('click', setRandomColor);