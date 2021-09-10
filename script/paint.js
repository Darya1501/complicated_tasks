const paint = document.getElementById('paint');
const ctx = paint.getContext('2d');
const color = document.getElementById('color');
const width = document.getElementById('width');


color.addEventListener('input', () => ctx.strokeStyle = color.value);
width.addEventListener('change', () => ctx.lineWidth = width.options[width.selectedIndex].value);



paint.addEventListener('mousemove', event => {
  const x = event.offsetX, y = event.offsetY,
    mx = event.movementX, my = event.movementY;

  if (event.buttons > 0) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - mx, y - my);

    ctx.stroke();
    ctx.closePath();
  }
});
