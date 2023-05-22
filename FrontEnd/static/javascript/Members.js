$(document).ready(function () {
    console.log('jQuery is working');

//function get members
    fetchMembers();

    function fetchMembers() {
        $.ajax({
            url: 'http://localhost:5500/getMembers',
            type: 'GET',
            success: function (res) {
                let members = res;
                let membersTemplate = '';
                members.forEach(member => {
                    membersTemplate += `
                        <tr memberId="${member.member_id}">
                            <th scope="col">${member.member_id}</th>
                            <th scope="col">${member.name}</th>
                            <th scope="col">${member.address}</th>
                            <th scope="col">${member.phone}</th>
                            <th scope="col">
                                <div class="button-container">
                                    <button type="button" id="editLectorButton" class="btn btn-outline-primary" role="button" data-target="#editLectorwModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                                    </svg>
                                    </button>
                                </div>
                                <div class="button-container">
                                    <button type="button" id="deleteLectorButton" class="btn btn-outline-danger" role="button"  data-target="#deleteLectorModal">
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
                $('#members').html(membersTemplate);
            },
            error: function (err) {
                console.log(err);
                console.log('error al conectar con el servidor');
            }
        });
    }

    //search member with id
    $('#searchMember').keyup(function () {
        let search = $('#searchMember').val();
        $.ajax({
            url: 'http://localhost:5500/getMember',
            type: 'POST',
            data: { search },
            success: function (res) {
                let members = res;
                if(members.length < 1){
                    fetchMembers();
                }
                else{
                    let membersTemplate = '';
                    members.forEach(member => {
                        membersTemplate += `
                        <tr memberId="${member.member_id}">
                            <th scope="col">${member.member_id}</th>
                            <th scope="col">${member.name}</th>
                            <th scope="col">${member.address}</th>
                            <th scope="col">${member.phone}</th>
                            <th scope="col">
                                <div class="button-container">
                                    <button type="button" id="editLectorButton" class="btn btn-outline-primary" role="button" data-target="#editLectorwModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                                    </svg>
                                    </button>
                                </div>
                                <div class="button-container">
                                    <button type="button" id="deleteLectorButton" class="btn btn-outline-danger" role="button"  data-target="#deleteLectorModal">
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
                    $('#members').html(membersTemplate);
                }
            },
            error: function (err) {
                console.log(err);
                console.log('error al conectar con el servidor');
            }
        });
    });

    //add member
    $('#AddLector').click(function (e) {
        let data= {
            name: $('#memberName').val(),
            address:$('#memberAddress').val(),
            phone:$('#memberPhone').val()
        }
        $.ajax({
            url: 'http://localhost:5500/addMember',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (res) {
                $('#addLectorModal').modal('hide');
                fetchMembers();
                toastr.success('Lector agregado al sistema', 'Lector agregado');

            },
            error: function (err) {
                console.log(err);
                console.log('error al conectar con el servidor');
            }
        });
    });

    //obtener id de un miembro y ponerlo en el modal como un atributo del modal
    $(document).on('click', '#editLectorButton', function(e){
        member = $(this).closest('tr').attr('memberId');
        $('#editLectorModal').attr('data-member', member);
        $.ajax({
            url:'http://localhost:5500/getDataMember',
            type: 'POST',
            data: JSON.stringify({
                "member_id": member
            }),
            dataType: "json",
            contentType: "application/json",
            success: function(res){
                $('#newMemberName').attr('placeholder', res[0].name);
                $('#newMemberAddress').attr('placeholder', res[0].address);
                $('#newMemberPhone').attr('placeholder', res[0].phone);
            },
            error: function(error){
                console.log('error', error)
            }
        });
        $('#editLectorModal').modal('show');
    });

    $('#saveChangesLector').click(function(e){
        lectorId = $('#editLectorModal').attr('data-member');
        lectorName = $('#newMemberName').val();
        lectorAddress = $('#newMemberAddress').val();
        lectorPhone = $('#newMemberPhone').val();
        if (lectorName == ''){
            lectorName = $('#newMemberName').attr('placeholder');
        }
        if (lectorAddress == ''){
            lectorAddress = $('#newMemberAddress').attr('placeholder');
        }
        if (lectorPhone == ''){
            lectorPhone = $('#newMemberPhone').attr('placeholder');
        }
        $.ajax({
            url:'http://localhost:5500/updateMember',
            type: 'POST',
            data: JSON.stringify({
                "member_id": lectorId,
                "name": lectorName,
                "address": lectorAddress,
                "phone": lectorPhone
            }),
            dataType: "json",
            contentType: "application/json",
            success: function(res){
                $('#editLectorModal').modal('hide');
                fetchMembers();
                toastr.success('Lector actualizado', 'Lector actualizado');
            },
            error: function(error){
                console.log('error', error)
            }
        });
    });

    $(document).on('click', '#deleteLectorButton', function(e) {
      member = $(this).closest('tr').attr('memberId');
      $('#deleteLectorModal').attr('data-member', member);
      $('#deleteLectorModal').modal('show');
    });

    $('#deleteLector').click(function(e) {
      member = $('#deleteLectorModal').attr('data-member');
      let postData = {
        "member_id": member
      };
      //se hace la peticion ajax para eliminar el libro
      $.ajax({
        url: 'http://localhost:5500/deleteMember',
        type: 'POST',
        data: JSON.stringify(postData),
        contentType: 'application/json',
        success: function(res) {
          console.log("res", res);
          $('#deleteLectorModal').modal('hide');
          fetchMembers();
          toastr.success('El lector fue eliminado del sistema.', 'Lector eliminado');
        },
        error: function(xhr, status, error) {
          // Ocurrió un error
          console.log("error", error);
        }
      });
    });

});