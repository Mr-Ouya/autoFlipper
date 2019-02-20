var username = $("#userData").val();
var email = $("#emailData").val();
var password = $("#passData").val();

//var myPlaintextPassword = 's0/\/\P4$$w0rD';
//var someOtherPlaintextPassword = 'not_bacon'

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