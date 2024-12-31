let tasks = [];

const priorityMap = { High: 3, Medium: 2, Low: 1 };

 function addTask(title, dueTime, priority) {
    if (!title || dueTime <= 0 || !priority) throw new Error("Invalid task data.");
    tasks.push({ title, dueTime, priority });
}

 function sortTasksByPriority() {
    return tasks.sort((a, b) => priorityMap[b.priority] - priorityMap[a.priority]);
}

 function displayTasksDueInTimeframe(minutes) {
    const futureTime = Date.now() + minutes * 60000;
    return tasks.filter(task => Date.now() + task.dueTime * 60000 <= futureTime);
}

 function sendReminders() {
    if (!tasks.length) throw new Error("No tasks available.");
    tasks.forEach(task => {
        setTimeout(() => console.log(`Reminder: Task "${task.title}" is due!`), task.dueTime * 60000);
    });
}

document.getElementById('addTaskBtn').addEventListener('click', async () => {
    const title = document.getElementById('taskTitle').value;
    const dueTime = parseInt(document.getElementById('taskDueTime').value);
    const priority = document.getElementById('taskPriority').value;

    if (!title || isNaN(dueTime) || !priority) {
        return alert("Please fill in all fields correctly.");
    }

    try {
        await addTask(title, dueTime, priority);
        updateTaskList();
    } catch (error) {
        console.error(error);
    }
});

document.getElementById('showDueTasksBtn').addEventListener('click', () => {
    const dueTasks = displayTasksDueInTimeframe(10);
    alert("Tasks due in the next 10 minutes:\n" + dueTasks.map(task => task.title).join("\n"));
});

document.getElementById('sendRemindersBtn').addEventListener('click', async () => {
    try {
        await sendReminders();
        alert("Reminders sent.");
    } catch (error) {
        alert("Error: " + error.message);
    }
});

function updateTaskList() {
    const sortedTasks = sortTasksByPriority();
    document.getElementById('taskList').innerHTML = sortedTasks.map(task => 
        `<li class="p-3 bg-gray-400 w-full rounded-md">${task.title} - Due in ${task.dueTime} minutes - Priority: ${task.priority}</li>`
    ).join('');
}