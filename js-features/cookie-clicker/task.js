'use strict';

const cookie = document.getElementById('cookie');
const counter = document.getElementById('clicker__counter');
const speed = document.getElementById('speed');

let lastTime = Date.now();

cookie.onclick = () => {
  if (cookie.width == 200)
    cookie.width = 220;
  else
    cookie.width = 200;
  counter.textContent++;
  const curTime = Date.now();
  speed.textContent = (1 / ((curTime - lastTime) / 1000)).toFixed(2);
  lastTime = curTime;
}