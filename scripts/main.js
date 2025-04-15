const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterButtons = document.querySelectorAll('.filters button');

let tasks = [];

function renderTasks(filter = 'all') {
  taskList.innerHTML = '';
  tasks
    .filter(task => 
      filter === 'all' ||
      (filter === 'active' && !task.completed) ||
      (filter === 'completed' && task.completed)
    )
    .forEach((task, index) => {
      const li = document.createElement('li');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.onchange = () => {
        task.completed = checkbox.checked;
        renderTasks(getActiveFilter());
      };

      const span = document.createElement('span');
      span.textContent = task.text;
      if (task.completed) span.classList.add('completed');

      const delBtn = document.createElement('button');
      delBtn.textContent = '🗑';
      delBtn.onclick = () => {
        tasks.splice(index, 1);
        renderTasks(getActiveFilter());
      };

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(delBtn);
      taskList.appendChild(li);
    });
}

function getActiveFilter() {
  return [...filterButtons].find(btn => btn.classList.contains('active'))?.dataset.filter || 'all';
}

addTaskBtn.onclick = () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    taskInput.value = '';
    renderTasks(getActiveFilter());
  }
};

filterButtons.forEach(btn => {
  btn.onclick = () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTasks(btn.dataset.filter);
  };
});

// Initialize
filterButtons[0].classList.add('active');
renderTasks();