document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("taskForm");
  const taskList = document.getElementById("taskList");
  const space = document.querySelector(".space");
  const total = document.querySelector(".total");
  const totalHigh = document.querySelector("#total");
  

    window.updateTaskStatus = updateTaskStatus;

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addTask();
  });

  function addTask() {
    const taskName = document.getElementById("taskName").value;
    const dueDate = document.getElementById("dueDate").value;

    if (taskName.trim() === "") {
      alert("Task name cannot be empty");
      return;
    }

    const task = {
      name: taskName,
      dueDate: dueDate,
      status: "To-Do",
      priority: "Medium",
    };

    displayTask(task);
    space.classList.add("none");
    clearForm();
  }

  function displayTask(task) {
    const taskItem = document.createElement("div");
      taskItem.classList.add("task");
     
      updateTaskStatus(this)
    taskItem.innerHTML = `
        <input type="checkbox" class="checkmark" onchange="updateTaskStatus(this)">
            <span>${task.name} - Due: ${task.dueDate}</span>
            <div>
                <button onclick="editTask(this)" class = "btn"><span class="material-symbols-outlined">
                edit
                </span></button>
                <button onclick="deleteTask(this)" class = "btn"><span class="material-symbols-outlined">
                delete
                </span></button>
            </div>
        `;
    taskList.prepend(taskItem);
      total.textContent = taskList.children.length;
      totalHigh.textContent = taskList.children.length;
     
  }

  function clearForm() {
    document.getElementById("taskForm").reset();
  }

  window.editTask = function (button) {
    const taskItem = button.closest(".task");
    const taskText = taskItem.querySelector("span");
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = taskText.innerText.split(" - ")[0];
    editInput.classList.add("edit-input");

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", function () {
      taskText.innerText =
        editInput.value +
        
        taskItem.querySelector("span").innerText.split(" - ")[1];
      taskItem.removeChild(editInput);
      taskItem.removeChild(saveButton);
    });

    taskItem.insertBefore(editInput, taskText);
    taskItem.insertBefore(saveButton, taskText);
  };

  window.deleteTask = function (button) {
    const taskItem = button.closest(".task");
    taskList.removeChild(taskItem);
      total.textContent = taskList.children.length;
      totalHigh.textContent = taskList.children.length;
      

    if (taskList.children.length === 0) {
      space.classList.remove("none");
    }
    };
    
    const high = document.getElementById("high-count");

    function updateTaskStatus(checkbox , ) {
        let count = 0;
    
      
        const checkboxes = taskList.querySelectorAll(".checkmark");
    
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                count++;
            }
        });
    
        high.textContent =  `${count} of`;
    
        
    }
    
    
});



