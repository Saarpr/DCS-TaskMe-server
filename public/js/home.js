
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

function renderProfile(profile){
    $(".container").empty();
        $(".container").append(
            '<p>' +
            'Name: ' + profile.userName + '<br>' +
            'ID: ' + profile.googleId + '<br>' +
            '<p>'+
            '<img src="' + profile.thumbnail + '" style="display:block;position:absolute; margin-top:30px">'
)
};

function usersOperationsListeners() {

    //Click login
    $("#login_btn").click(() => {
        getlogin();
    });

    //
}