
// Get HTML elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");

// Load saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        // Task text
        const span = document.createElement("span");
        span.textContent = task.text;

        // Action buttons container
        const actions = document.createElement("div");
        actions.className = "task-actions";

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";

        editBtn.addEventListener("click", () => {
            const updatedTask = prompt("Edit your task:", task.text);

            if (updatedTask !== null && updatedTask.trim() !== "") {
                tasks[index].text = updatedTask.trim();
                saveTasks();
                displayTasks();
            } else if (updatedTask !== null) {
                alert("Task cannot be empty!");
            }
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this task?")) {
                tasks.splice(index, 1);
                saveTasks();
                displayTasks();
            }
        });

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(actions);

        taskList.appendChild(li);
    });

    // Update task statistics
    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.length - completed;

    taskCount.textContent = `${tasks.length} Tasks`;

    document.getElementById("totalTasks").textContent = tasks.length;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;

    // Show or hide empty message
    emptyMessage.style.display = tasks.length === 0 ? "block" : "none";
}

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();
}

// Add task button event
addTaskBtn.addEventListener("click", addTask);

// Add task using Enter key
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Display saved tasks when the page loads
displayTasks();
// Clear all completed tasks
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

clearCompletedBtn.addEventListener("click", () => {
    const completedCount = tasks.filter(task => task.completed).length;

    if (completedCount === 0) {
        alert("There are no completed tasks to clear!");
        return;
    }

    if (confirm("Are you sure you want to clear all completed tasks?")) {
        tasks = tasks.filter(task => !task.completed);

        saveTasks();
        displayTasks();
    }
});