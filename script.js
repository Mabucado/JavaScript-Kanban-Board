const taskInput = document.querySelector(".taskInput");
const addTask = document.querySelector(".submitButton");
const todo = document.getElementById("Todo");
const taskLists = document.querySelectorAll(".taskList");
const columns = document.querySelectorAll('.column');
let draggedItem = null;


// Add new task
addTask.addEventListener("click", event => {
  event.preventDefault();
  const task = taskInput.value.trim();

  if (task) {
    const li = document.createElement("li");
    li.textContent = task;
    addDragEventsToItem(li);
    todo.appendChild(li);
    taskInput.value = "";
  } else {
    alert("Enter a task");
  }
});

// Function to add drag events to a list item
function addDragEventsToItem(item) {
  item.setAttribute("draggable", "true");

  columns.forEach(column => {
  column.addEventListener('dragover', e => {
    e.preventDefault(); // Allows dropping
  });

  column.addEventListener('drop', e => {
    e.preventDefault();

    if (draggedItem) {
      // Find the <ul> inside this column to append the dragged item to
      const list = column.querySelector('ul.taskList');
      if (list) {
        list.appendChild(draggedItem);
      }
    }
  });
});

  item.addEventListener("dragstart", () => {
    draggedItem = item;
    setTimeout(() => item.style.display = "none", 0);
  });

  item.addEventListener("dragend", () => {
    setTimeout(() => {
      item.style.display = "block";
      draggedItem = null;
    }, 0);
  });
}

// Add drop handlers to each task list (the drop zones)
taskLists.forEach(list => {
  list.addEventListener("dragover", e => e.preventDefault()); // allow drop

  list.addEventListener("drop", e => {
    e.preventDefault();
    if (draggedItem) {
      list.appendChild(draggedItem);
    }
  });
});
