var username = $("#userData").val();
var email = $("#emailData").val();
var password = $("#passData").val();

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon'

var API = {
    saveOne: function (example) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "autoflipper/createAccount",
        });
    }

}

bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
        // Store hash in your password DB.
    });
});