import { saveTasks, loadTasks } from './storage.js';

let tasks = loadTasks();

export function getTasks() {
  return tasks;
}

export function addTask(text) {
  tasks.push({ text, completed: false });
  saveTasks(tasks);
}

export function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks(tasks);
}

export function toggleTask(index, completed) {
  tasks[index].completed = completed;
  saveTasks(tasks);
}

export function renderTasks(taskListElement, filter) {
  taskListElement.innerHTML = '';
  const filtered = tasks.filter(task =>
    filter === 'all' ||
    (filter === 'active' && !task.completed) ||
    (filter === 'completed' && task.completed)
  );

  filtered.forEach((task, index) => {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.onchange = () => {
      toggleTask(index, checkbox.checked);
      renderTasks(taskListElement, getActiveFilter());
    };

    const span = document.createElement('span');
    span.textContent = task.text;
    if (task.completed) span.classList.add('completed');

    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑';
    delBtn.onclick = () => {
      deleteTask(index);
      renderTasks(taskListElement, getActiveFilter());
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    taskListElement.appendChild(li);
  });
}

function getActiveFilter() {
  const btn = document.querySelector('.filters button.active');
  return btn?.dataset.filter || 'all';
}
