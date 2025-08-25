'use strict';

const cookie = document.getElementById('cookie');
const counter = document.getElementById('clicker__counter');
const speed = document.getElementById('speed');

let lastTime = Date.now();

cookie.onclick = () => {
  if (cookie.width === 200) {
    cookie.width = 220;
    cookie.height = 220;
  } else {
    cookie.width = 200;
    cookie.height = 200;
  }
  counter.textContent++;
  const curTime = Date.now();
  const clickSpeed = 1 / ((curTime - lastTime) / 1000);
  speed.textContent = clickSpeed.toFixed(2);
  lastTime = curTime;
};