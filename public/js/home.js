$(function () {
    usersOperationsListeners();
    isLoggedIn();
});

function isLoggedIn(){
    $.ajax({
        url: 'http://localhost:5500/profile/',
        type: 'GET',
        success: function (profile) {
            renderProfile(profile);
            console.log(profile);
        }
    });
}

function getlogin() {
    window.location.replace("" + '/auth/login?redirect=' + btoa(window.location.href));
};

function getlogout(){
    console.log("im in")
    $.ajax({
        url: 'http://localhost:5500/auth/logout',
        type: 'GET',
        success: function () {
            window.location.replace("");
        }
    });
}

function renderProfile(profile){
    $(".container").empty();
    $("#header-nav").append(
        `<img id="profilePic" src="${profile.thumbnail}" alt="profilePic">`+
            `<button id="logoutBtn" style ="position: absolute; right:10px;" class="btn btn-embossed btn-primary">`+
                'Logout' +
            `</button>`
    );

    $(".container").append(
        '<div id="content">'+
            `<h2>Hello ${profile.userName}</h2>`
            +'<h3>Here is your upcoming tasks</h3>'+
        '<div class="row demo-samples">'+
            '<div class="col-4">'+
                '<div class="todo">'+
                    '<ul id="ul-task">'+
                    '</ul>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '</div>'
    );
    profile.tasks.map(item=>{
        $("#ul-task").append(
            `<li value=${item._id}>`+
                `<div class="todo-content">`+
                    '<h4 class="todo-name">'+
                         `<strong>${item.taskName}</strong>`+
                    '</h4>'+
                    item.dateTime+
               ' </div>'+
            '</li>'
        )
    });

    $(".container").append(
    '<div id = "buttons">' +
        '<button class ="btn btn-success"> Add </button>'+
        '<button class="btn btn-warning">Update</button>'+
        '<button class="btn btn-danger">Delete</button>'+
    '</div>'+
        '<div id="crud_forms">'+

        '</div>'
    );
    usersOperationsListeners(profile);
};

//////////////////////////////Update_Start/////////////////////////////////
function updateForm(){
    $(".fr").empty();
    $("#crud_forms").append(
        '<div class="fr" style="width:400px; display:flex;flex-direction:column; margin:auto;">'+
        '<br>'+
        '<label for="taskName">Task Name</label>'+
        '<input type="text" class="form-control" name="taskName" id="taskName"/>'   +
        '<label for="color">Description</label>'+
        '<input type="text" class="form-control" name="color" id="taskColor"/>'+
        '<label htmlFor="meeting-time">Time and Date:</label>'+
        '<input type="datetime-local" id="meeting-time" name="meeting-time" value="2018-06-12T19:30" min="2020-06-07T00:00" max="2022-06-14T00:00">'+'<br>'+
        '<button id="btn-submit" class="btn btn-hg btn-primary type="submit">Update Task</button>'+
        '</div>'
    )
}

function updateTask(user, taskID){
    let task = {};
    task._id=taskID;
    if ($("#taskName").val())
        task.taskName = $("#taskName").val();
    if ($("#taskColor").val())
        task.color = $("#taskColor").val();
    // if ($("#meeting-time").val())
    //     task.dateTime = $("#meeting-time").val();
    console.log(task);
    updateTaskApi(user, task);
};
function updateTaskApi(user, task){
    console.log(task);
    $.ajax({
        url: `http://localhost:5500/profile/${user.googleId}`,
        type: 'PUT',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(task),
        success: function () {
            console.log(user)
            window.location.replace("");
        }
    });
};
//////////////////////////////Update_Done/////////////////////////////////

//////////////////////////////ADD_Start/////////////////////////////////
function addForm(){
    $(".fr").empty();
    $("#crud_forms").append(
        '<div class="fr" style="width:400px; display:flex;flex-direction:column; margin:auto;">'+
        '<br>'+
        '<label for="taskName">Task Name:</label>'+
        '<input type="text" class="form-control" name="taskName" id="taskName"/>'   +
        '<label for="color">Description:</label>'+
        '<input type="text" class="form-control" name="color" id="taskColor"/>'+
        '<label htmlFor="meeting-time">Time and Date:</label>'+
        '<input type="datetime-local" id="meeting-time" name="meeting-time" value="2018-06-12T19:30" min="2020-06-07T00:00" max="2022-06-14T00:00">'+'<br>'+
        '<button id="btn-submit" class="btn btn-hg btn-primary type="submit">Add Task</button>' +
        '</div>'
    )
}

function addTask(user) {
    let task = {};
    if ($("#taskName").val())
        task.taskName = $("#taskName").val();
    if ($("#taskColor").val())
        task.color = $("#taskColor").val();
    if ($("#meeting-time").val())
        task.dateTime = $("#meeting-time").val();
    console.log(task);
    addTaskById(user, task);
};

function addTaskById(user, obj) {
    console.log(obj);
    $.ajax({
        url: `http://localhost:5500/profile/${user.googleId}`,
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(obj),
        success: function () {
            console.log(user)
            window.location.replace("");
        }
    });
};
//////////////////////////////ADD_Done/////////////////////////////////

//////////////////////////////Delete_Start/////////////////////////////////
function deleteTaskById(profile, taskID) {
    let obj = {_id:taskID}
    $.ajax({
        url: `http://localhost:5500/profile/${profile.googleId}`,
        type: 'DELETE',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(obj),
        success: function () {
            window.location.replace("");
        }
    });
}

function usersOperationsListeners(profile) {

    //Click login
    $("#login_btn").click(() => {
        getlogin();
    });
    //Click logout
    $("#logoutBtn").click(() => {
        getlogout();
    });
    //Click delete
    $(".btn-danger").click(() => {
        let taskID = $(".todo-done").attr("value");
        // console.log(profile, taskID)
        deleteTaskById(profile, taskID);
    });
    //Click add
    $(".btn-success").click(() => {
        addForm();
        console.log(profile)
        $("#btn-submit").click(()=> {
            addTask(profile)
        })
    });
    //Click update
    $(".btn-warning").click(() => {
        let taskID = $(".todo-done").attr("value");
        updateForm();
        console.log(profile)
        $("#btn-submit").click(()=> {
            updateTask(profile, taskID)
        })
    });
    $('.todo').on('click', 'li', function () {
        $('.todo-done').addClass('todo-content').removeClass('todo-done');
        $(this).toggleClass('todo-done');
    });
}