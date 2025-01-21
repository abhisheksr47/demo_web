function fetchTasks() {
    fetch('./backend/tasks.php')
        .then(response => response.json())
        .then(tasks => {
            const tasksDiv = document.getElementById('tasksList');
            tasksDiv.innerHTML = '';
            
            tasks.forEach(task => {
                const taskElement = document.createElement('div');
                taskElement.className = 'task-item';
                taskElement.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <p>Status: ${task.status}</p>
                    <button onclick="deleteTask(${task.id})" class="delete-btn">Delete</button>
                `;
                tasksDiv.appendChild(taskElement);
            });
        });
}

function addTask(event) {
    event.preventDefault();
    
    const task = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        status: document.getElementById('status').value
    };

    fetch('./backend/tasks.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    .then(() => {
        document.getElementById('taskForm').reset();
        fetchTasks();
    });
}

function deleteTask(id) {
    if (confirm('Delete this task?')) {
        fetch(`./backend/tasks.php?id=${id}`, {
            method: 'DELETE'
        })
        .then(() => fetchTasks());
    }
}

document.getElementById('taskForm').addEventListener('submit', addTask);
fetchTasks();