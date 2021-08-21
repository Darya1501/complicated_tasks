const input = document.querySelector('input');
const text = document.querySelector('p');


function debounce(f, t) {
  return function(args) {
    const previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (previousCall && ((this.lastCall - previousCall) <= t)) {
      clearTimeout(this.lastCallTimer);
    }
    this.lastCallTimer = setTimeout(() => f(args), t);
  };
}


function addText() {
  text.style.color = '#0b78ec';
  text.innerText = input.value;
  if (input.value === '') {
    text.innerText = 'Введите текст в поле выше';
    text.style.color = '#A9A9A9';
  }
}

const debounceAddText =  debounce(addText, 300);

input.addEventListener('keydown', () => {
  debounceAddText();
});
