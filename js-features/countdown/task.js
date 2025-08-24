'use strict';

const timer = document.getElementById('timer');

let time = timer.textContent;

const formatTime = new Date();
formatTime.setTime(time * 1000 + formatTime.getTimezoneOffset() * 60000);

const addText = function() {
  time--;
  if (time) {
    formatTime.setTime(formatTime.getTime() - 1000);
    timer.textContent = formatTime.toLocaleTimeString('ru');
  } else {
    clearInterval(timerID);
    document.getElementById('status').textContent = 'Вы победили в конкурсе!';
    document.getElementById('download').click();
  }
}

const timerID = setInterval(addText, 1000);