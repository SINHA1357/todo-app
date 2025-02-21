// const API_URL = "http://localhost:5000/tasks";
const API_URL = "https://backend-2k44.onrender.com/tasks";

async function fetchTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `${task.task} <button onclick="deleteTask('${task._id}')">❌</button>`;
        taskList.appendChild(li);
    });
}

async function addTask() {
    const taskInput = document.getElementById("taskInput");
    if (!taskInput.value) return alert("Enter a task!");

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: taskInput.value, completed: false }),
    });

    taskInput.value = "";
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
}

fetchTasks();
