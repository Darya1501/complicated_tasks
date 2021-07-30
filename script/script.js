let num = 266219;
let total = 1;
let remainder;

while (num > 0) { 
  remainder = num % 10;
  total *= remainder;
  num = (num - remainder) / 10;
}
console.log('Сумма цифр числа 266219:', total);

console.log(total, 'в третьей степени:', total ** 3);

console.log('Первые две цифры числа', total, '-', total.toString().slice(0, 2));