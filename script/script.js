'use strict';

let DomElement = function(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height + 'px';
  this.width = width + 'px';
  this.bg = bg;
  this.fontSize = fontSize + 'px';
};

DomElement.prototype.createElem = function() {
  let elem;
  if (this.selector[0] === '.') {

    elem = document.createElement('div');
    elem.classList.add(`${this.selector.slice(1)}`);
    elem.textContent = 'Заголовок с классом';

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
  `;

  document.body.append(elem);
};

let domElementDiv = new DomElement('.container', 400, 500, 'green', 24);
domElementDiv.createElem();

let domElementP = new DomElement('#paragraph', 30, 500, 'red', 16);
domElementP.createElem();