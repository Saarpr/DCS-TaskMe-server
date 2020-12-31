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
            `<button id="logoutBtn" class="btn btn-embossed btn-primary">`+
                'Logout' +
            `</button>`
    );

    $(".container").append(
        '<div id="content">'+
            `<h2>${profile.userName} Tasks</h2>`+
        '<div id="radio-btn">'+

        '</div>'+
        '</div>'
    );

    profile.tasks.map(item=>{
        $("#radio-btn").append(
            '<div class="tile">'+
            `<label class="radio" style="backgound-color = ${item.color}">`+
                `<input type="radio" name="optionsRadios" id="optionsRadios1" value=${item._id} data-toggle="radio">`+
            item.taskName+
            '</label>'+
            '</div>'
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

function addForm(){
    $("#crud_forms").append(
        '<br>'+
        '<label for="taskName">Task Name</label>'+
        '<input type="text" class="form-control" name="taskName" id="taskName"/>'   +
        '<label for="color">Color</label>'+
        '<input type="text" class="form-control" name="color" id="taskColor"/>'+
        '<button id="btn-submit" type="submit">Add Task</button>'
    )
}

function addTask(user) {
    let task = {};
    if ($("#taskName").val())
        task.taskName = $("#taskName").val();
    if ($("#taskColor").val())
        task.color = $("#taskColor").val();
    console.log(task);
    addTaskById(user, task);
};

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
        let taskID = document.querySelector('input[name="optionsRadios"]:checked').value;
        // console.log(profile, rates)
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
}