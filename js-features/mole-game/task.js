'use strict';

const dead = document.getElementById('dead');
const lost = document.getElementById('lost');
const getHole = index => document.getElementById(`hole${index}`);

const clear = () => {
  dead.textContent = 0;
  lost.textContent = 0;
}

for (let i = 1; i < 10; i++) {
  getHole(i).onclick = () => {
    if (getHole(i).className.includes('hole_has-mole'))
      dead.textContent++;
    else
      lost.textContent++;
    if (dead.textContent == 10) {
      alert('Победа!');
      clear();
    }
    if (lost.textContent == 5) {
      alert('Вы проиграли');
      clear();
    }
  }
}