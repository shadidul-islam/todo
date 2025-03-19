import { Todos } from "./class/Todos.js";

const BACKEND_ROOT_URL = 'http://localhost:3001';
const todos = new Todos(BACKEND_ROOT_URL);

const list = document.querySelector('ul');
const input = document.querySelector('input');

input.disabled = true;

const renderTask = (task) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-group-item');
    li.innerHTML = task.getText();
    list.appendChild(li);
};

const getTasks = () => {
    todos.getTasks().then((tasks) => {
        tasks.forEach(task => {
            renderTask(task);
        });
        input.disabled = false;
    }).catch((error) => {
        alert(error);
    });
};

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const task = input.value.trim();
        if (task !== '') {
            todos.addTask(task).then((task) => {
                renderTask(task);
                input.value = '';
                input.focus();
            });
        }
    }
});

getTasks();