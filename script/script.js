const radio = document.querySelector('.radio'),
  inputLabel = document.getElementById('inputLabel'),
  button = document.getElementById('button'),
  inputField = document.getElementById('input'),
  outputField = document.getElementById('output'),
  changeCurrency = document.getElementById('change'),
  reset = document.getElementById('reset');

let currentCurrency = 'USD';
let isForeignCurrency = true;

const validate = field => {
  field.addEventListener('input', () => {
    console.log();
    field.value = field.value.replace(/[^0-9.]/, '');
  });
  field.addEventListener('blur', () => {
    const event = new Event('input');
    field.dispatchEvent(event);
  });
};
validate(inputField);
validate(outputField);

const convert = (value, rate) => {
  if (isForeignCurrency) {
    outputField.value = (value * rate).toFixed(2);
  } else {
    inputField.value = (value / rate).toFixed(2);
  }
};

const getCurrency = (value, currencyName) => {
  fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    .then(response => {
      if (response.status !== 200) {
        throw new Error('Status network not 200');
      }
      return (response.json());
    })
    .then(data => convert(value, data.Valute[currencyName].Value))
    .catch(error => console.error(error));
};

radio.addEventListener('change', event => {
  const target = event.target;
  inputLabel.textContent = target.value;
  currentCurrency = target.id;
  outputField.value = '';
  inputField.value = '';
});

button.addEventListener('click', () => {
  const input = isForeignCurrency ? inputField : outputField;
  if (input.value.trim() !== '') {
    getCurrency(input.value, currentCurrency);
  }
});

changeCurrency.addEventListener('click', () => {
  if (isForeignCurrency) {
    inputField.setAttribute('disabled', true);
    outputField.removeAttribute('disabled');
    isForeignCurrency = false;
  } else {
    outputField.setAttribute('disabled', true);
    inputField.removeAttribute('disabled');
    isForeignCurrency = true;
  }
  outputField.value = '';
  inputField.value = '';
});

reset.addEventListener('click', () => {
  outputField.setAttribute('disabled', true);
  inputField.removeAttribute('disabled');
  isForeignCurrency = true;
  outputField.value = '';
  inputField.value = '';
});
