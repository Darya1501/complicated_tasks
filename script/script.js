'use strict';

let DomElement = function(selector, height, width, bg, position) {
  this.selector = selector;
  this.height = height + 'px';
  this.width = width + 'px';
  this.bg = bg;
  this.position = position;
};

DomElement.prototype.createElem = function() {
  let elem;
  if (this.selector[0] === '.') {

    elem = document.createElement('div');
    elem.classList.add(`${this.selector.slice(1)}`);
    elem.textContent = 'Двигайте квадрат стрелками на клавиатуре';

  } else if (this.selector[0] === '#') {

    elem = document.createElement('p');
    elem.id = this.selector.slice(1);
    elem.textContent = 'Параграф с id';
  }

  elem.style.cssText = `
    height: ${this.height};
    width: ${this.width};
    background: ${this.bg};
    font-size: ${this.fontSize};
    text-align: center;
    position: absolute;
    top: 200px;
    left: 200px;
  `;

  document.body.append(elem);

  document.addEventListener("keydown", function(event) {

      if (event.key === 'ArrowUp') {
        elem.style.top = elem.style.top.slice(0, -2) - 10 + 'px';
      } else if (event.key === 'ArrowLeft') {
        elem.style.left = elem.style.left.slice(0, -2) - 10 + 'px';
      } else if (event.key === 'ArrowRight') {
        elem.style.left = +elem.style.left.slice(0, -2) + 10 + 'px';
      } else if (event.key === 'ArrowDown') {
        elem.style.top = +elem.style.top.slice(0, -2) + 10 + 'px';
      }
  });

};

let square = new DomElement('.square', 100, 100, '#5F9EA0', 'absolute');

document.addEventListener("DOMContentLoaded", function() {
  square.createElem();
});