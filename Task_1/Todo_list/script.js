let tasks = [];
let taskColors = [];

function addTask() {
  let taskInput = document.getElementById("taskInput").value.trim();

  if (!taskInput) {
    alert("Please enter a task!");
    return;
  }

  tasks.push(taskInput);
  taskColors.push("white");
  displayTasks();
  document.getElementById("taskInput").value = "";
}

document
  .getElementById("taskInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

function displayTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    let li = document.createElement("li");
    li.textContent = task;
    li.id = "li_task";

    li.style.backgroundColor = taskColors[index];

    li.addEventListener("click", function () {
      toggleBackgroundColor(this, index);
    });

    let div = document.createElement("div");
    div.id = "div_list";

    let deleteButton = document.createElement("button");
    deleteButton.id = "delete_button";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      tasks.splice(index, 1);
      taskColors.splice(index, 1);
      displayTasks();
    };

    let editButton = document.createElement("button");
    editButton.id = "edit_button";
    editButton.textContent = "Edit";
    editButton.onclick = function () {
      let newTask = prompt("Edit task.....", task);
      if (newTask && newTask.trim() !== "") {
        tasks[index] = newTask.trim();
        displayTasks();
      }
    };
    div.append(deleteButton, editButton);
    li.appendChild(div);

    taskList.appendChild(li);
  });
}

function toggleBackgroundColor(element, index) {
  if (element.style.backgroundColor === "green") {
    element.style.backgroundColor = "white";
    taskColors[index] = "white";
  } else {
    element.style.backgroundColor = "green";
    taskColors[index] = "green";
  }
}
