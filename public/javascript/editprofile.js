$(document).ready(function () {

    //Edit Profile
    $('#submit-edit').click(function () {
        let edit = $('#profile-input');

        $.get('/edit-profile', {edit: edit.val()}, function(data, status){});
        window.location= '/edit-profile';
    });
})