var username = $("#userData").val();
var email = $("#emailData").val();
var password = $("#passData").val();

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon'

var API = {
    saveOne: function (account) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "/new_account",
        });
    }

}

var register = function () {

    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) throw err
        bcrypt.hash(password, salt, function (err, hash) {

            var newaccount = {
                username: username,
                email: email,
                password: hash
            }

            API.saveOne(newaccount).then(function () {});
            // Store hash in your password DB.
        });
    });



}






$("regSubmit").on("click", register)