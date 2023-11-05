let index;
let flag; //used to toggle between delete item and delete all operations
let edit_task_in_progress = false;
let data = []; //this variable is re-declared in another part of the program
const color_map = { high: "red", medium: "orange", low: "grey" };

if (localStorage.getItem("data") != null) {
  data = JSON.parse(localStorage.getItem("data"));
  sort_data(); // call sort function here
  display_tasks();
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
  document.getElementById("selected_time").value = "";
}

//display popup for delete all tasks
function display_popup_for_delete_all_tasks(id) {
  document.getElementById("tasks").style.display = "none";
  document.getElementById("delete_all_tasks_popup").style.display = "block";
  document.querySelector(".main_buttons").style.display = "none";
  flag = id;
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
  if (flag == "delete_all") {
    localStorage.removeItem("data");
    data = [];

    clear_input_fields(); //clear input fields
    document.getElementById("tasks").innerHTML = "";
    alert("To-do list has been cleared.");
  } else {
    delete_individual_tasks(flag);
  }
  document.getElementById("tasks").style.display = "block";
  document.getElementById("delete_all_tasks_popup").style.display = "none";
  document.querySelector(".main_buttons").style.display = "block";
}

//delete individual task
function delete_individual_tasks(id) {
  data.splice(id, 1);

  //call sort function here
  sort_data();

  if (data.length == 0) {
    localStorage.removeItem("data");
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
  document.getElementById("view_due_time").innerHTML = data[id].due_time;
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

//check if all input fields are filled
function check_input_fields() {
  if (
    document.getElementById("input-string").value == "" ||
    document.getElementById("task_priority").value == "" ||
    document.getElementById("selectedDate").value == "" ||
    document.getElementById("selected_time").value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

//close edit task/save task popups when 'X' icon is pressed
function close_popup() {
  if (edit_task_in_progress) {
    toggle_off();
    edit_task_in_progress = false;
  }

  document.getElementById("tasks").style.display = "block";

  document.getElementById("popup1").style.display = "none";
  document.querySelector(".main_buttons").style.display = "block";
  clear_input_fields();
}

//function that gets executed when save button is pressed
function close_popup_on_save() {
  if (check_input_fields()) {
    document.getElementById("tasks").style.display = "block";

    document.getElementById("popup1").style.display = "none";
    document.querySelector(".main_buttons").style.display = "block";
  } else {
    alert("Please fill in all details");
  }
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
  edit_task_in_progress = true;
  toggle_on();
  display_popup();
  document.getElementById("input-string").value = data[y].title;
  document.getElementById("priority").value = data[y].priority;
  document.getElementById("selectedDate").value = data[y].due_date;
  document.getElementById("selected_time").value = data[y].due_time;

  index = y;
}

//function that gets executed when update button is pressed
function edit() {
  if (check_input_fields()) {
    data[index].title = document.getElementById("input-string").value;
    data[index].priority = document.getElementById("priority").value;
    data[index].due_date = document.getElementById("selectedDate").value;
    data[index].due_time = document.getElementById("selected_time").value;

    // call sort function here
    sort_data();

    localStorage.setItem("data", JSON.stringify(data));
    clear_input_fields(); //clear input fields

    document.getElementById("tasks").style.display = "block";

    document.getElementById("popup1").style.display = "none";
    document.querySelector(".main_buttons").style.display = "block";
    edit_task_in_progress = false;
    toggle_off();
    display_tasks();
  } else {
    alert("Please fill in all details");
  }
}

//displaying tasks
function display_tasks() {

  tasks.innerHTML = "";
  data.map((x, y) => {
    tasks.innerHTML += `<div class = 'taskItems' id =${y}><span id ="task_text${y}" class="task_text" >
    ${x.title}</span>
    <span class="option_buttons">
            <span  ><button id ='checkbox${y}' type = 'checkbox' onclick = 'change_task_status(${y})'
            style="  width:30px;height: 35px;border-radius: 50px;right: 150px;position:absolute;
            "></button></span>
            <span class = 'task_view_button' onclick = 'view_task(${y})'>View</span>
            <span class ='task_del_button' onclick = 'display_popup_for_delete_all_tasks(${y})'>X</span>
            <span class = 'task_edit_button' onclick="edit_task(${y})">Edit</span>

    </span>
     </div>`;

    //setting color based on priority

    document.getElementById(y).style.borderBlockColor = color_map[x.priority];

    if (x.status == "Complete") {
      document.getElementById(`task_text${y}`).style.textDecoration =
        "line-through";
      document.getElementById(`task_text${y}`).style.fontStyle = "italic";
      document.getElementById(`checkbox${y}`).style.backgroundColor = "green";
      document.getElementById(`checkbox${y}`).style.position = "absolute";
      document.getElementById(`checkbox${y}`).style.height = "35px";
      document.getElementById(`checkbox${y}`).style.right = "150";
      document.getElementById(`checkbox${y}`).style.borderRadius = "50px";
      document.getElementById(`checkbox${y}`).style.width = "30px";
    }
  });
}

function add_task() {
  //event.preventDefault();
  
  let title = document.getElementById("input-string").value;
  let priority = document.getElementById("priority").value;
  let due_date = document.getElementById("selectedDate").value;
  let due_time = document.getElementById("selected_time").value;

  let status = "Not Complete"; //default task status = not complete

  clear_input_fields(); // clear input fields

  //testing local storage
  data.push({
    title: title,
    priority: priority,
    due_date: due_date,
    due_time: due_time,
    status: status,
  });

  //call sort function
  sort_data();

  localStorage.setItem("data", JSON.stringify(data));
  display_tasks();
}

function sort_data() {
  data = data.sort(
    (a, b) =>
      new Date(a.due_date + " " + a.due_time) -
      new Date(b.due_date + " " + b.due_time)
  );
}
