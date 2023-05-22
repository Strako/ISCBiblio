$(document).ready(function () {
    console.log('jQuery is working');

//function get members
    fetchAdmins();

    function fetchAdmins() {
        $.ajax({
            url: 'http://localhost:5500/getAdmins',
            type: 'GET',
            success: function (res) {
                let admins= res;
                let adminsTemplate = '';
                admins.forEach(admin => {
                    adminsTemplate += `
                        <tr adminId="${admin.admin_id}">
                            <th scope="col">${admin.admin_id}</th>
                            <th scope="col">${admin.mail}</th>
                            <th scope="col">${admin.password}</th>
                            <th scope="col">${admin.role}</th>
                            <th scope="col">
                                <div class="button-container">
                                    <button type="button" id="editAdminButton" class="btn btn-outline-primary" role="button" data-target="#editLectorwModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                                    </svg>
                                    </button>
                                </div>
                                <div class="button-container">
                                    <button type="button" id="deleteAdminButton" class="btn btn-outline-danger" role="button"  data-target="#deleteLectorModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
                                    </svg>
                                    </button>
                                </div>
                            </th>
                        </tr>
                    `
                });
                $('#admins').html(adminsTemplate);
            },
            error: function (err) {
                console.log(err);
                console.log('error al conectar con el servidor');
            }
        });
    }

    //search member with id
    $('#searchAdmin').keyup(function () {
        let search = $('#searchAdmin').val();
        $.ajax({
            url: 'http://localhost:5500/getAdmin',
            type: 'POST',
            data: { search },
            success: function (res) {
                let admins = res;
                if(admins.length < 1){
                    fetchAdmins();
                }
                else {
                    let adminsTemplate = '';
                    admins.forEach(admin => {
                    adminsTemplate += `
                        <tr adminId="${admin.admin_id}">
                            <th scope="col">${admin.admin_id}</th>
                            <th scope="col">${admin.mail}</th>
                            <th scope="col">${admin.password}</th>
                            <th scope="col">${admin.role}</th>
                            <th scope="col">
                                <div class="button-container">
                                    <button type="button" id="editAdminButton" class="btn btn-outline-primary" role="button" data-target="#editLectorwModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                                    </svg>
                                    </button>
                                </div>
                                <div class="button-container">
                                    <button type="button" id="deleteAdminButton" class="btn btn-outline-danger" role="button"  data-target="#deleteLectorModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
                                    </svg>
                                    </button>
                                </div>
                            </th>
                        </tr>
                    `
                    });
                    $('#admins').html(adminsTemplate);
                }
            },
            error: function (err) {
                console.log(err);
                console.log('error al conectar con el servidor');
            }
        });
    });

    //add member
    $('#addAdmin').click(function (e) {
        let data= {
            mail: $('#mailAdmin').val(),
            password:$('#passwd').val(),
            role:$('#roleAdmin').val()
        }
        $.ajax({
            url: 'http://localhost:5500/addAdmin',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (res) {
                $('#addAdminModal').modal('hide');
                fetchAdmins();
                toastr.success('Administrador agregado al sistema', 'Administrador agregado');

            },
            error: function (err) {
                console.log(err);
                console.log('error al conectar con el servidor');
            }
        });
    });

    //obtener id de un miembro y ponerlo en el modal como un atributo del modal
    $(document).on('click', '#editAdminButton', function(e){
        admin = $(this).closest('tr').attr('adminId');
        $('#editAdminModal').attr('data-admin', admin);
        $.ajax({
            url:'http://localhost:5500/getDataAdmin',
            type: 'POST',
            data: JSON.stringify({
                "admin_id": admin
            }),
            dataType: "json",
            contentType: "application/json",
            success: function(res){
                $('#newMailAdmin').attr('placeholder', res[0].mail);
                $('#newPasswdAdmin').attr('placeholder', res[0].password);
                $('#newRoleAdmin').attr('placeholder', res[0].role);
            },
            error: function(error){
                console.log('error', error)
            }
        });
        $('#editAdminModal').modal('show');
    });

    $('#saveChangesAdmin').click(function(e){
        adminId = $('#editAdminModal').attr('data-admin');
        adminMail = $('#newMailAdmin').val();
        adminPasswd = $('#newPasswdAdmin').val();
        adminRole = $('#newRoleAdmin').val();
        if (adminMail == ''){
            adminMail = $('#newMailAdmin').attr('placeholder');
        }
        if (adminPasswd == ''){
            adminPasswd = $('#newPasswdAdmin').attr('placeholder');
        }
        if (adminRole == ''){
            adminRole = $('#newRoleAdmin').attr('placeholder');
        }
        $.ajax({
            url:'http://localhost:5500/updateAdmin',
            type: 'POST',
            data: JSON.stringify({
                "admin_id": adminId,
                "mail": adminMail,
                "password": adminPasswd,
                "role": adminRole
            }),
            dataType: "json",
            contentType: "application/json",
            success: function(res){
                $('#editAdminModal').modal('hide');
                console.log('res', res);
                fetchAdmins();
                toastr.success('Administrador actualizado', 'Administrador actualizado');
            },
            error: function(error){
                console.log('error', error)
            }
        });
    });

    $(document).on('click', '#deleteAdminButton', function(e) {
        admin = $(this).closest('tr').attr('adminId');
        $('#deleteAdminModal').attr('data-admin', admin);
        $('#deleteAdminModal').modal('show');
    });

    $('#deleteAdmin').click(function(e) {
        admin = $('#deleteAdminModal').attr('data-admin');
        let postData = {
            "admin_id": admin
        };
      //se hace la peticion ajax para eliminar el libro
        $.ajax({
            url: 'http://localhost:5500/deleteAdmin',
            type: 'POST',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            success: function(res) {
                console.log("res", res);
                $('#deleteAdminModal').modal('hide');
                fetchAdmins();
                toastr.success('El administrador fue eliminado del sistema.', 'Administrador eliminado');
            },
            error: function(error) {
            // Ocurrió un error
            console.log("error", error);
            }
        });
    });

});
