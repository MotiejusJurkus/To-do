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

  const filteredTasks = tasks.filter((task) => {
    return (
      filter === 'all' ||
      (filter === 'active' && !task.completed) ||
      (filter === 'completed' && task.completed)
    );
  });

  filteredTasks.forEach((task, renderIndex) => {
    const trueIndex = tasks.findIndex(t => t === task); // retain original index
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    // ✅ Accessibility: Add unique ID and name
    const checkboxId = `task-${trueIndex}`;
    checkbox.id = checkboxId;
    checkbox.name = checkboxId;

    checkbox.onchange = () => {
      toggleTask(trueIndex, checkbox.checked);
      renderTasks(taskListElement, getActiveFilter());
    };

    const label = document.createElement('label');
    label.setAttribute('for', checkboxId);
    label.textContent = task.text;
    if (task.completed) label.classList.add('completed');

    const delBtn = document.createElement('button');
    delBtn.innerHTML = `<img src="assets/delete.svg" alt="Delete" class="delete-icon">`;
    delBtn.onclick = () => {
      deleteTask(trueIndex);
      renderTasks(taskListElement, getActiveFilter());
    };

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(delBtn);

    taskListElement.appendChild(li);
  });
}

function getActiveFilter() {
  const activeBtn = document.querySelector('.filters button.active');
  return activeBtn?.dataset.filter || 'all';
}
