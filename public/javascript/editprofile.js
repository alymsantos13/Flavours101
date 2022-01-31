$(document).ready(function () {

    //Edit Profile
    $('#submit-edit').click(function () {
        let username = $('#username-input');
        let description = $('#description-input');

        $.get('/edit-profile', {username: username.value, description = description.value}, function(data, status){});
        window.location= '/edit-profile';
    });

    $('#small_link').click(function () {
        window.location = '/edit-profile';
    });

    
})