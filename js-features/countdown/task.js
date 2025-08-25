'use strict';

const timer = document.getElementById('timer');
let time = parseInt(timer.textContent, 10);

const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

timer.textContent = formatTime(time);

const addText = function() {
  time--;
  if (time >= 0) {
    timer.textContent = formatTime(time);
  }
  if (time === 0) {
    clearInterval(timerID);
    document.getElementById('status').textContent = 'Вы победили в конкурсе!';
    document.getElementById('download').click();
  }
}

const timerID = setInterval(addText, 1000);
