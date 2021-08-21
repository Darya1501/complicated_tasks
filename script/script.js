document.addEventListener('DOMContentLoaded', () => {

  const startButton = document.querySelector('.start');
  const resetButton = document.querySelector('.reset');
  const container = document.querySelector('.container');

  console.log(container.offsetWidth);

  const elems = [];

  let reqID = 0;

  function move(elem) {
    const left = elem.vx + parseInt(elem.html.style.left);
    const top = elem.vy + parseInt(elem.html.style.top);

    if (left <= 0 || left > container.offsetWidth - elem.html.offsetWidth - elem.vx) {
      elem.vx = -elem.vx;
    }
    if (top < 0 || top >= container.offsetHeight - elem.html.offsetHeight - elem.vy) {
      elem.vy = -elem.vy;
    }

    elem.html.style.left = left + 'px';
    elem.html.style.top = top + 'px';
  }

  function step() {

    elems.forEach(elem => {
      move(elem);
    });

    reqID = requestAnimationFrame(step);
  }


  function createElems(className) {
    const count = Math.floor(Math.random() * 5) + 3;
    console.log('count: ', count);

    for (let i = 0; i < count; i++) {
      const div = document.createElement('div');
      div.className = className;
      div.style.left = 15 + 'px';
      div.style.top = 15 + 'px';
      container.append(div);
      const elem = {
        html: div,
        vx: Math.floor(Math.random() * 10) + 1,
        vy: Math.floor(Math.random() * 10) + 1,
      };
      elems.push(elem);
    }
  }

  createElems('square');
  createElems('circle');

  startButton.addEventListener('click', () => {
    if (reqID === 0) {
      reqID = requestAnimationFrame(step);
    } else {
      cancelAnimationFrame(reqID);
      reqID = 0;
    }
  });

  resetButton.addEventListener('click', () => {
    cancelAnimationFrame(reqID);
    reqID = 0;
    elems.forEach(elem => {
      elem.html.style.left = 15 + 'px';
      elem.html.style.top = 15 + 'px';
    });
  });

});
