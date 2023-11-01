tasks = document.getElementById("tasks");
let index;
let data = [];

if (localStorage.getItem("data") != null) {
  data = JSON.parse(localStorage.getItem("data"));

  tasks.innerHTML = "";
  data.map((x, y) => {
    tasks.innerHTML += `<div class = 'taskItems' id =${y}><span id ="task_text${y}" class="task_text" onclick='change_task_status(${y})'>
    ${x.title}</span>
    <span class="option_buttons">
            <span class = 'task_view_button' onclick = 'view_task(${y})'>View</span>
            <span class ='task_del_button' onclick = 'delete_individual_tasks(${y})'>X</span>
            <span class = 'task_edit_button' onclick="edit_task(${y})">Edit</span>

    </span>
     </div>`;

    //setting color based on priority
    if (x.priority == "high") {
      document.getElementById(y).style.borderBlockColor = "red";
    } else if (x.priority == "medium") {
      document.getElementById(y).style.borderBlockColor = "orange";
    } else if (x.priority == "low") {
      document.getElementById(y).style.borderBlockColor = "grey";
    }
    if (x.status == "Complete") {
      document.getElementById(`task_text${y}`).style.textDecoration =
        "line-through";
      document.getElementById(`task_text${y}`).style.fontStyle = "italic";
    }
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  add_task();
});

//clear all input fields
function clear_input_fields() {
  document.getElementById("input-string").value = "";
  document.getElementById("priority").value = "";
  document.getElementById("selectedDate").value = "";
}

//display popup for delete all tasks
function display_popup_for_delete_all_tasks() {
  document.getElementById("tasks").style.display = "none";
  document.getElementById("delete_all_tasks_popup").style.display = "block";
  document.querySelector(".main_buttons").style.display = "none";
}

//close popup for delete all tasks
function close_popup_for_delete_all_tasks() {
  document.getElementById("tasks").style.display = "block";
  document.getElementById("delete_all_tasks_popup").style.display = "none";
  document.querySelector(".main_buttons").style.display = "block";
}

//mark task as complete
function change_task_status(y) {
  if (data[y].status == "Not Complete") {
    data[y].status = "Complete";
  } else {
    data[y].status = "Not Complete";
  }
  localStorage.setItem("data", JSON.stringify(data));
  display_tasks();
}

//delete all tasks
function delete_all_tasks() {
  localStorage.clear();
  data = [];

  document.getElementById("tasks").style.display = "block";
  document.getElementById("delete_all_tasks_popup").style.display = "none";
  document.querySelector(".main_buttons").style.display = "block";
  clear_input_fields(); //clear input fields
  document.getElementById("tasks").innerHTML = "";
  alert("To-do list has been cleared.");
}

//delete individual task
function delete_individual_tasks(id) {
  data.splice(id, 1);
  if (data.length == 0) {
    localStorage.clear();
    data = [];
  } else {
    localStorage.setItem("data", JSON.stringify(data));
  }
  console.log(data);
  display_tasks();
}

//View tasks
function view_task(id) {
  document.getElementById("tasks").style.display = "none";
  document.querySelector(".main_buttons").style.display = "none";
  document.getElementById("view_tasks").style.display = "block";

  document.getElementById("view_title").innerHTML = data[id].title;
  document.getElementById("view_due_date").innerHTML = data[id].due_date;
  document.getElementById("view_priority").innerHTML = data[id].priority;
  document.getElementById("view_status").innerHTML = data[id].status;
}
//close view task popup
function close_view_task_popup() {
  document.getElementById("tasks").style.display = "block";
  document.querySelector(".main_buttons").style.display = "block";
  document.getElementById("view_tasks").style.display = "none";
}

function display_popup() {
  document.getElementById("tasks").style.display = "none";

  document.getElementById("popup1").style.display = "block";
  document.querySelector(".main_buttons").style.display = "none";
}

function close_popup() {
  document.getElementById("tasks").style.display = "block";

  document.getElementById("popup1").style.display = "none";
  document.querySelector(".main_buttons").style.display = "block";
}
//toggle between 'add ask' and 'edit task' forms
function toggle_on() {
  document.getElementById("edit_task").style.display = "block";
  document.getElementById("save_task").style.display = "none";
  document.getElementById("add_task_popup").style.display = "none";
  document.getElementById("edit_task_popup").style.display = "block";
}
//toggle between 'edit task' and 'add task' forms
function toggle_off() {
  document.getElementById("edit_task").style.display = "none";
  document.getElementById("save_task").style.display = "block";
  document.getElementById("add_task_popup").style.display = "block";
  document.getElementById("edit_task_popup").style.display = "none";
}

//edit task
function edit_task(y) {
  toggle_on();
  display_popup();
  document.getElementById("input-string").value = data[y].title;
  document.getElementById("priority").value = data[y].priority;
  document.getElementById("selectedDate").value = data[y].due_date;
  index = y;
}

//edit task wrapper
function edit() {
  data[index].title = document.getElementById("input-string").value;
  data[index].priority = document.getElementById("priority").value;
  data[index].due_date = document.getElementById("selectedDate").value;
  localStorage.setItem("data", JSON.stringify(data));
  clear_input_fields(); //clear input fields

  document.getElementById("tasks").style.display = "block";

  document.getElementById("popup1").style.display = "none";
  document.querySelector(".main_buttons").style.display = "block";
  toggle_off();
  display_tasks();
}

//displaying tasks
let display_tasks = () => {
  console.log(data);
  tasks.innerHTML = "";
  data.map((x, y) => {
    tasks.innerHTML += `<div class = 'taskItems' id =${y}><span id ="task_text${y}" class="task_text" onclick='change_task_status(${y})'>
    ${x.title}</span>
    <span class="option_buttons">
            <span class = 'task_view_button' onclick = 'view_task(${y})'>View</span>
            <span class ='task_del_button' onclick = 'delete_individual_tasks(${y})'>X</span>
            <span class = 'task_edit_button' onclick="edit_task(${y})">Edit</span>

    </span>
     </div>`;

    //setting color based on priority
    if (x.priority == "high") {
      document.getElementById(y).style.borderBlockColor = "red";
    } else if (x.priority == "medium") {
      document.getElementById(y).style.borderBlockColor = "orange";
    } else if (x.priority == "low") {
      document.getElementById(y).style.borderBlockColor = "grey";
    }
    if (x.status == "Complete") {
      document.getElementById(`task_text${y}`).style.textDecoration =
        "line-through";
      document.getElementById(`task_text${y}`).style.fontStyle = "italic";
    }
  });
};

function add_task() {
  //event.preventDefault();
  console.log(data);
  let title = document.getElementById("input-string").value;
  let priority = document.getElementById("priority").value;
  let due_date = document.getElementById("selectedDate").value;

  let status = "Not Complete"; //default task status = not complete

  clear_input_fields(); // clear input fields

  //testing local storage
  data.push({
    title: title,
    priority: priority,
    due_date: due_date,
    status: status,
  });
  localStorage.setItem("data", JSON.stringify(data));

  display_tasks();
}
