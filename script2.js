document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('add');
    const addBtn = document.getElementById('btn');
    const tasklist = document.getElementById('todoList');
    let newList = JSON.parse(localStorage.getItem("todoList")) || [];

    addBtn.classList.add('glow-on-hover'); 

    addBtn.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            if (!taskDuplicated(taskText)) {
                addTask(taskText);
                saveTasks();

                newTaskInput.value = '';
                newTaskInput.focus();
            } else {
                alert("Cette tâche existe déjà");
                newTaskInput.focus();
            }
        }
    });

    function taskDuplicated(taskText) {
        return newList.includes(taskText);
    }

    function addTask(taskText) {
        const li = document.createElement('li');
        
        const checkButton = document.createElement('button');
        checkButton.textContent = '✔';
        checkButton.classList.add('check-button'); 
        checkButton.addEventListener('click', () => {
            li.style.textDecoration = 'line-through';
            checkButton.classList.toggle('checked'); 
        });

        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;

        const effacerBoutton = document.createElement('button');
        effacerBoutton.textContent = 'Effacer';
        effacerBoutton.classList.add('small-glow-on-hover'); 
        effacerBoutton.addEventListener('click', () => {
            tasklist.removeChild(li);
            newList = newList.filter(task => task !== taskText);
            saveTasks();
        });

        li.appendChild(checkButton);
        li.appendChild(textSpan);
        li.appendChild(effacerBoutton);
        tasklist.appendChild(li);

        newList.push(taskText);
        saveTasks();
    }

    function saveTasks() {
        localStorage.setItem("todoList", JSON.stringify(newList));
    }

    function loadTasks() {
        newList.forEach(task => {
            const li = document.createElement('li');

            const checkButton = document.createElement('button');
            checkButton.textContent = '✔';
            checkButton.classList.add('check-button'); 
            checkButton.addEventListener('click', () => {
                li.style.textDecoration = 'line-through';
                checkButton.classList.toggle('checked');
            });

            const textSpan = document.createElement('span');
            textSpan.textContent = task;

            const effacerBoutton = document.createElement('button');
            effacerBoutton.textContent = 'Effacer';
            effacerBoutton.classList.add('small-glow-on-hover'); 
            effacerBoutton.addEventListener('click', () => {
                tasklist.removeChild(li);
                newList = newList.filter(t => t !== task);
                saveTasks();
            });

            li.appendChild(checkButton);
            li.appendChild(textSpan);
            li.appendChild(effacerBoutton);
            tasklist.appendChild(li);
        });
    }

    loadTasks();
});
