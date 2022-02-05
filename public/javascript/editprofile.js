$(document).ready(function () {

    //Edit Profile
    $('#submit-edit').click(function () {
        let username = $('#username-input');
        let description = $('#description-input');
        let avatar = $('#avatar-input');

        $.get('/update-profile', {username: username.val(), description: description.val(), avatar: avatar.val()}, function(data, status){});
        window.location= '/profile';
    });

    $('#small_link').click(function () {
        window.location = '/edit-profile';
    });

    $('#delete-acct').click(function (){
        window.location = '/';
    });

    $('#center_button').click(function () {
        let old = $('#old_pass');
        let new1 = $('#new_pass1');
        let new2 = $('#new_pass2');

        if(new1.val() != new2.val()){
            console.log('Error');
        }

        else{
            $.get('/update-password', {password: new2.val()}, function(data, status){});
        }
        

    
    });

    
})