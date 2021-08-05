// Задание 1
let arr = ['1234', '4356', '34', '56754', '2987', '25', '1849'];

for (let i = 0; i < arr.length; i++) {
  if (arr[i][0] === '2' || arr[i][0] === '4') {
    console.log(arr[i]);
  }
}

// Задание 2
for (let i = 1; i <= 100; i++) {
  let flag = true;
  for (let j = 2; j < i; j++) {
    if (i % j === 0) {
      flag = false;
      break;
    }
  }
  if (flag) {
    console.log(i, '- простое число, делители этого числа: 1 и', i);
  }
}