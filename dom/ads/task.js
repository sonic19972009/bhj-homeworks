'use strict';

const rotators = document.getElementsByClassName('rotator');

const setRotatorCase = rotator => {
  rotator.cases[rotator.index].classList.remove('rotator__case_active');
  rotator.index++;  
  if (rotator.index >= rotator.cases.length)
    rotator.index = 0;
  rotator.cases[rotator.index].classList.add('rotator__case_active');
  setTimeout(setRotatorCase, rotator.cases[rotator.index].dataset.speed, rotator);
}

for (const rotator of rotators) {
  rotator.cases = rotator.getElementsByClassName('rotator__case');
  rotator.index = rotator.cases.length - 1;
  
  for(const rotatorCase of rotator.cases) {
    rotatorCase.style.color = rotatorCase.dataset.color;
  }
  
  setRotatorCase(rotator);
}

