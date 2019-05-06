'use strict';

const canvas = document.getElementById('draw');

let ctx,
  maxLineWidth,
  minLineWidth


function createCanvas() {
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

document.addEventListener('DOMContentLoaded', onLoad);
window.addEventListener('resize', clearCanvas);


function onLoad() {
  createCanvas();
}


function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createCanvas();
}

canvas.addEventListener('mousedown', onMousedown);
let mousedown = false;

function onMousedown() {
  mousedown = true;
}

canvas.addEventListener('mousemove', draw);

let moveToX,
  moveToY,
  lineWidth = 5,
  color = 1,
  maxColor = false,
  minColor = true;


function draw() {
  // по нажатию кнопки мыши начинаем рисовать линию
  if (mousedown) {
    ctx.beginPath();
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // толщина кисти, при достижении максимума меняем статус на true и начинаем уменьшать, аналогично в другую сторону
    if (lineWidth === 100) {
      maxLineWidth = true;
      minLineWidth = false;
    }

    if (lineWidth === 5) {
      minLineWidth = true;
      maxLineWidth = false;
    }

    maxLineWidth ? lineWidth-- : lineWidth++;
    ctx.lineWidth = lineWidth;

    // цвет кисти, если не зажат shift значение диапазона цвета наращиваем, при достижении максимума - скидываем до 0, 
    // если shift - уменьшаем, при достижении минимума устанавливаем на максимальное значение

    ctx.strokeStyle = `hsl(${color}, 100%, 50%)`;

    if (!event.shiftKey) {
      color === 359 ? color = 0 : color++
    } else {
      (event.shiftKey && color === 0) ? color = 359 : color--
    }

    // отрисовка, если есть предыдущая точка, перемещаемся в её координаты, рисуем линию до актуальных координат

    if (moveToX !== undefined) {
      ctx.moveTo(moveToX, moveToY)
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
      ctx.closePath();
    }

    // запоминаем координаты начальной/предыдущей точки
    moveToX = event.offsetX;
    moveToY = event.offsetY;
  }
}

canvas.addEventListener('mouseup', stopDraw);
canvas.addEventListener('mouseleave', stopDraw)

// если кнопка мыши не нажата, перестаем рисовать линию, меняем статусы
function stopDraw() {
  mousedown = false;
  moveToX = undefined;
  moveToY = undefined;
}

// очищаем канвас при двойном нажатии 
canvas.addEventListener('dblclick', () => {
  clearCanvas();
});


