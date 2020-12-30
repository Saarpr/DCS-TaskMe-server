$(function () {
    usersOperationsListeners();
    $.ajax({
        url: 'http://localhost:5500/profile/user',
        type: 'GET',
        success: function (profile) {
                console.log(profile);
            }
        // error: function(){
        //     location.replace("http://localhost:5500/auth/google")
        // }
    });
});

function getlogin() {
    // alert("inside");
    // location.replace("http://localhost:5500/auth/google")
    $.ajax({
        url: 'http://localhost:5500/profile/user',
        type: 'GET',
        success: function (profile) {
                console.log(profile);
            },
        error: function(){
            location.replace("http://localhost:5500/auth/google")
        }
    });
}


function usersOperationsListeners() {

    //GET
    $("#login_btn").click(() => {
        getlogin();
    });
}
