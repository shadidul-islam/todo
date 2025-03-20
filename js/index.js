import { Todos } from "./class/Todos.js";

const BACKEND_ROOT_URL = 'http://localhost:3001';
const todos = new Todos(BACKEND_ROOT_URL);

const list = document.querySelector('ul');
const input = document.querySelector('input');

input.disabled = true;

const renderTask = (task) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-group-item');
    li.setAttribute('data-key', task.getId().toString());
    renderSpan(li, task.getText());
    renderLink(li, task.getId());
    list.appendChild(li);
};

const renderSpan = (li, text) => {
    const span = li.appendChild(document.createElement('span'));
    span.innerHTML = text;
};

const renderLink = (li, id) => {
    const a = li.appendChild(document.createElement('a'));
    a.innerHTML = '<i class="bi bi-trash"></i>';
    a.setAttribute('style', 'float: right');
    a.addEventListener('click', (event) => {
        event.preventDefault();
        todos.removeTask(id).then((removed_id) => {
            const li_to_remove = document.querySelector(`[data-key='${removed_id}']`);
            if (li_to_remove) {
                list.removeChild(li_to_remove);
            }
        }).catch((error) => {
            alert(error);
        });
    });
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