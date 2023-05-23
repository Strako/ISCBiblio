$(document).ready(function () {
    console.log("jquery loaded");
    $("#loginButton").click(function () {
        var username = $("#usrname").val();
        var password = $("#passwd").val();
        var data = {
            mail: username,
            password: password,
        };
        $.ajax({
            url: "http://localhost:5500/signin",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function (res) {
                if(res==200){
                    window.location.href = "http://localhost:5500/";
                }
                else{
                    toastr.error('usuario o contraseña incorrectos', 'Error de autenticación');
                }
            },
            error: function (res) {
                console.log('error: ',res);
            }
        });
    });
});
