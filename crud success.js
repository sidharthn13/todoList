tasks = document.getElementById("tasks");
let index;
let data = [];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addtask();
});

//clear all input fields
function clear_fields() {
  document.getElementById("inputString").value = "";
  document.getElementById("priority").value = "";
  document.getElementById("selectedDate").value = "";
}

//display popup for delete all tasks
function delall_popup() {
  document.getElementById("tasks").style.display = "none";
  document.getElementById("delallpopup").style.display = "block";
  document.querySelector(".unibuttons").style.display = "none";
}

//close popup for delete all tasks
function close_delall() {
  document.getElementById("tasks").style.display = "block";
  document.getElementById("delallpopup").style.display = "none";
  document.querySelector(".unibuttons").style.display = "block";
}

//mark task as complete
function marktask(y) {
  if (data[y].status == "Not Complete") {
    data[y].status = "Complete";
  } else {
    data[y].status = "Not Complete";
  }
  localStorage.setItem("data", JSON.stringify(data));
  createtasks();
}

//delete all tasks
function delall() {
  data = [];
  localStorage.setItem("data", JSON.stringify(data));

  document.getElementById("tasks").style.display = "block";
  document.getElementById("delallpopup").style.display = "none";
  document.querySelector(".unibuttons").style.display = "block";
  clear_fields(); //clear input fields
  createtasks();
  alert("To-do list has been cleared.");
}

//delete individual task
function deltask(id) {
  data.splice(id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  createtasks();
}

//View tasks
function view_task(id) {
  //edits being made

  document.getElementById("tasks").style.display = "none";
  document.querySelector(".unibuttons").style.display = "none";
  document.getElementById("viewtasks").style.display = "block";

  document.getElementById("viewtitle").innerHTML = data[id].title;
  document.getElementById("viewduedate").innerHTML = data[id].duedate;
  document.getElementById("viewpriority").innerHTML = data[id].priority;
  document.getElementById("viewstatus").innerHTML = data[id].status;
}
//close view task popup
function close_viewtasks() {
  document.getElementById("tasks").style.display = "block";
  document.querySelector(".unibuttons").style.display = "block";
  document.getElementById("viewtasks").style.display = "none";
}

function popup() {
  document.getElementById("tasks").style.display = "none";

  document.getElementById("popup1").style.display = "block";
  document.querySelector(".unibuttons").style.display = "none";
}

function closepopup() {
  document.getElementById("tasks").style.display = "block";

  document.getElementById("popup1").style.display = "none";
  document.querySelector(".unibuttons").style.display = "block";
}
//toggle between 'add ask' and 'edit task' forms
function toggle_on() {
  document.getElementById("edittask").style.display = "block";
  document.getElementById("savetask").style.display = "none";
  document.getElementById("popupid").style.display = "none";
  document.getElementById("popup_editid").style.display = "block";
}
//toggle between 'edit task' and 'add task' forms
function toggle_off() {
  document.getElementById("edittask").style.display = "none";
  document.getElementById("savetask").style.display = "block";
  document.getElementById("popupid").style.display = "block";
  document.getElementById("popup_editid").style.display = "none";
}

//edit task
function edit_task(y) {
  toggle_on();
  popup();
  document.getElementById("inputString").value = data[y].title;
  document.getElementById("priority").value = data[y].priority;
  document.getElementById("selectedDate").value = data[y].duedate;
  index = y;
}

//edit task wrapper
function edit() {
  data[index].title = document.getElementById("inputString").value;
  data[index].priority = document.getElementById("priority").value;
  data[index].duedate = document.getElementById("selectedDate").value;
  localStorage.setItem("data", JSON.stringify(data));
  clear_fields(); //clear input fields

  document.getElementById("tasks").style.display = "block";

  document.getElementById("popup1").style.display = "none";
  document.querySelector(".unibuttons").style.display = "block";
  toggle_off();
  createtasks();
}

//displaying tasks
let createtasks = () => {
  console.log(data);
  tasks.innerHTML = "";
  data.map((x, y) => {
    tasks.innerHTML += `<div class = 'taskItems' id =${y}><span id ="task_text${y}" class="task_text" onclick='marktask(${y})'>
    ${x.title}</span>
    <span class="option_buttons">
            <span class = 'taskviewbutton' onclick = 'view_task(${y})'>View</span>
            <span class ='taskdelbutton' onclick = 'deltask(${y})'>X</span>
            <span class = 'taskeditbutton' onclick="edit_task(${y})">Edit</span>

    </span>
     </div>`;

    //setting colour based on priority
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

function addtask() {
  //event.preventDefault();
  console.log(data);
  let title = document.getElementById("inputString").value;
  let priority = document.getElementById("priority").value;
  let duedate = document.getElementById("selectedDate").value;

  let status = "Not Complete"; //default task status = not complete

  clear_fields(); // clear input fields

  //testing local storage
  data.push({
    title: title,
    priority: priority,
    duedate: duedate,
    status: status,
  });
  localStorage.setItem("data", JSON.stringify(data));

  data = JSON.parse(localStorage.getItem("data"));
  createtasks();
}
