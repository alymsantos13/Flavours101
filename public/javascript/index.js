$(document).ready(function () {
    console.log("success");
    /**
     * Sign Up Button.
     *
     *
     */

  $('#login').click(function (e) {
    e.preventDefault();
    var username = $('#username');
    var password = $('#password');

    $.post("/signin", 
    {
        username: username.val(), 
        password: password.val()
    }, function(result) {
        console.log(result.username + username.val() + result.password + password.val());

        if(result.username == username.val() && result.password == password.val()) {
            window.location = '/profile';
            done();
        }
        else
            $('#error-message-sign-in').text("Invalid Credentials.");
    });

  })

  
});
