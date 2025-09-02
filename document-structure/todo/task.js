'use strict';

const taskInput = document.getElementById('task__input');
const taskAdd = document.getElementById('tasks__add');
const tasksList = document.getElementById('tasks__list');

const storageKey = 'tasks';

const closeTask = (e, task) => {
  e.preventDefault();
  task.remove();
  localStorage.setItem(storageKey, tasksList.innerHTML);
};

const addTask = () => {
  if (!taskInput.value.trim()) return;

  const task = document.createElement('div');
  task.className = 'task';
  task.innerHTML = `
    <div class="task__title">${taskInput.value}</div>
    <a href="#" class="task__remove">&times;</a>
  `;

  task.querySelector('.task__remove')
      .addEventListener('click', e => closeTask(e, task));

  tasksList.appendChild(task);
  localStorage.setItem(storageKey, tasksList.innerHTML);
  taskInput.value = '';
};

taskAdd.addEventListener('click', e => {
  e.preventDefault();
  addTask();
});

taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTask();
  }
});

if (localStorage.getItem(storageKey)) {
  tasksList.innerHTML = localStorage.getItem(storageKey);
  for (const task of tasksList.getElementsByClassName('task')) {
    task.querySelector('.task__remove')
        .addEventListener('click', e => closeTask(e, task));
  }
}
