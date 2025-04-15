import { renderTasks, addTask, getTasks } from './tasks.js';

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterButtons = document.querySelectorAll('.filters button');

function getActiveFilter() {
  const btn = document.querySelector('.filters button.active');
  return btn?.dataset.filter || 'all';
}

addTaskBtn.onclick = () => {
  const text = taskInput.value.trim();
  if (text) {
    addTask(text);
    taskInput.value = '';
    renderTasks(taskList, getActiveFilter());
  }
};

filterButtons.forEach(btn => {
  btn.onclick = () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTasks(taskList, btn.dataset.filter);
  };
});

// Initialize
filterButtons[0].classList.add('active');
renderTasks(taskList, getActiveFilter());
