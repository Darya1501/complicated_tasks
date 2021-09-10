const rings = document.getElementById('rings');
const ctx1 = rings.getContext('2d');

const angle = degrees => (Math.PI / 180) * degrees;

const drawArc = (x, y, r, begin, length, color) => {
  ctx1.beginPath();
  ctx1.arc(x, y, r, angle(begin), angle(begin + length));
  ctx1.lineWidth = '9';
  ctx1.strokeStyle = color;
  ctx1.stroke();
  ctx1.closePath();
};

// Рисуем круги
drawArc(60, 60, 50, 0, 360, '#0885C2'); // синий
drawArc(115, 110, 50, 0, 360, '#FAB031'); // желтый
drawArc(180, 60, 50, 0, 360, '#000000'); // черный
drawArc(235, 110, 50, 0, 360, '#1C8B3C'); // зеленый
drawArc(300, 60, 50, 0, 360, '#EC324D'); // красный

// Перекрываем нужные участки
drawArc(60, 60, 50, 350, 25, '#0885C2'); // синий
drawArc(115, 110, 50, 275, 25, '#FAB031'); // желтый
drawArc(180, 60, 50, 350, 25, '#000000'); // черный
drawArc(235, 110, 50, 275, 25, '#1C8B3C'); // зеленый
