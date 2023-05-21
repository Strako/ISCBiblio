//js para prestamos
$(document).ready(function() {
    console.log('jQuery cargado');

    fetchBorrows();

    //funcion para obtener los prestamos
    function fetchBorrows() {
        console.log("fetching borrows from server....");
        $.ajax({
            url: 'http://localhost:5500/getBorrows',
            type: 'GET',
            success: function(res) {
                //console.log("res", res);
                let borrows = res;
                let borrowsTemplate = '';
                borrows.forEach(borrow => {
                    borrowsTemplate += `
                        <tr borrowId ="${borrow.borrow_id}">
                            <th scope="col">${borrow.borrow_id}</th>
                            <th scope="col">${borrow.admin_id}</th>
                            <th scope="col">${borrow.borrow_date}</th>
                            <th scope="col">${borrow.return_date}</th>
                            <th scope="col">${borrow.book_id}</th>
                            <th scope="col">${borrow.member_id}</th>
                            <th>
                                <div class="button-container">
                                    <button type="button" id="editBorrowButton" class="btn btn-outline-primary" role="button" data-target="#editBorrowModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                                    </svg>
                                    </button>
                                </div>
                                <div class="button-container">
                                    <button type="button" id="deleteBorrowButton" class="btn btn-outline-danger" role="button"  data-target="#deleteBorrowModal">
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
                $('#borrows').html(borrowsTemplate);
            },
            error: function(xhr, status, error) {
                // Ocurrió un error durante la solicitud
                console.log("error", error);
            }
        });
    }

    //search borrow by id
    $('#searchBorrow').keyup(function(e) {
        let search = $('#searchBorrow').val();
        $.ajax({
            url: 'http://localhost:5500/getBorrow',
            type: 'POST',
            data: {search},
            success: function(res) {
                let borrows = res;
                if(borrows.length < 1){
                    fetchBorrows();
                }
                else{
                    let borrowsTemplate = '';
                    borrows.forEach(borrow => {
                        borrowsTemplate += `
                        <tr borrowId ="${borrow.borrow_id}">
                            <th scope="col">${borrow.borrow_id}</th>
                            <th scope="col">${borrow.admin_id}</th>
                            <th scope="col">${borrow.borrow_date}</th>
                            <th scope="col">${borrow.return_date}</th>
                            <th scope="col">${borrow.book_id}</th>
                            <th scope="col">${borrow.member_id}</th>
                            <th>
                                <div class="button-container">
                                    <button type="button" id="editBorrowButton" class="btn btn-outline-primary" role="button" data-target="#editBorrowModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                                    </svg>
                                    </button>
                                </div>
                                <div class="button-container">
                                    <button type="button" id="deleteBorrowButton" class="btn btn-outline-danger" role="button"  data-target="#deleteBorrowModal">
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
                    $('#borrows').html(borrowsTemplate);
                }
            },
            error: function(xhr, status, error) {
                // Ocurrió un error durante la solicitud
                console.log("error", error);
            }
        });
    });


    //agregar prestamo
    $('#regBorrow').click(function(e) {
        let data = {
            admin_id: $('#adminId').val(),
            borrow_date: $('#borrowDate').val(),
            return_date: $('#returnDate').val(),
            book_id: $('#bookId').val(),
            member_id: $('#memberId').val()
        };
        //validacion para registrar libros si hay existencias
        let book = {
            book_id: $('#bookId').val()
        };
        console.log(book);
        $.ajax({
            url: 'http://localhost:5500/getDataBook',
            type: 'POST',
            data: JSON.stringify(book),
            contentType: 'application/json',
            success: function(res) {
                cant = res[0].quantity;
                if(cant > 0){
                    $.ajax({
                        url: 'http://localhost:5500/addBorrow',
                        type: 'POST',
                        data: JSON.stringify(data),
                        dataType: "json",
                        contentType: "application/json",
                        success: function(res) {
                            console.log("res", res);
                            fetchBorrows();
                    //        //console.log("data", data);
                            $('#addBorrowModal').modal('hide');
                            toastr.success('Libro agregado al catálogo de libros.', 'Libro agregado');
                        },
                        error: function(xhr, status, error) {
                            // Ocurrió un error durante la solicitud
                            console.log("error", error);
                        }
                    });
                }
                else{
                    toastr.error('No puedes agregar un prestamo, no hay más existencias de este libro.', 'Error');
                }
            },
            error: function(xhr, status, error) {
                // Ocurrió un error durante la solicitud
                console.log("error", error);
            }
        });
    });

    //obtener id de prestamo
    $(document).on("click", "#editBorrowButton", function() {
        //obtiene el borrow id y lo guarda como un atributo data-borrow en el modal de editar
        borrowId = $(this).closest('tr').attr('borrowId');
        $('#editBorrowModal').attr('data-borrow', borrowId);
        data = {
            borrow_id: borrowId
        };
        $.ajax({
            url: 'http://localhost:5500/getDataBorrow',
            type: 'POST',
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function(res) {
                $('#newAdminId').attr('placeholder', res[0].admin_id);
                $('#newBorrowDate').val(res[0].borrow_date);
                $('#newReturnDate').val(res[0].return_date);
                $('#newBookId').attr('placeholder', res[0].book_id);
                $('#newMemberId').attr('placeholder', res[0].member_id);
            },
            error: function(xhr, status, error) {
                // Ocurrió un error durante la solicitud
                console.log("error", error);
            }
        });
        $('#editBorrowModal').modal('show');
    });
    //editar prestamo
    $('#saveEditBorrow').click(function(e) {
        borrow = $('#editBorrowModal').attr('data-borrow');
        borrow_date = $('#newBorrowDate').val();
        return_date = $('#newReturnDate').val();
        member_id = $('#newMemberId').val();
        admin_id = $('#newAdminId').val();
        book_id = $('#newBookId').val();
        if (borrow_date == "") {
            borrow_date = $('#newBorrowDate').attr('placeholder');
        }
        if (return_date == "") {
            return_date = $('#newReturnDate').attr('placeholder');
        }
        if (member_id == "") {
            member_id = $('#newMemberId').attr('placeholder');
        }
        if (admin_id == "") {
            admin_id = $('#newAdminId').attr('placeholder');
        }
        if (book_id == "") {
            book_id = $('#newBookId').attr('placeholder');
        }
        let data = {
            admin_id: admin_id,
            borrow_date: borrow_date,
            return_date: return_date,
            book_id: book_id,
            member_id: member_id,
            borrow_id: borrow
        };
        $.ajax({
            url: 'http://localhost:5500/updateBorrow',
            type: 'POST',
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function(res) {
                console.log("res", res);
                fetchBorrows();
                $('#editBorrowModal').modal('hide');
                toastr.success('Datos de prestamo actualizados.', 'Prestamo actualizado');
            },
            error: function(xhr, status, error) {
                // Ocurrió un error durante la solicitud
                console.log("error", error);
            }
        });
    });

    //eliminar prestamo
    $(document).on("click", "#deleteBorrowButton", function() {
        borrowId = $(this).closest('tr').attr('borrowId');
        $('#deleteBorrowModal').attr('data-borrow', borrowId);
        console.log("borrowId", borrowId);
        $('#deleteBorrowModal').modal('show');
    });

    $('#deleteBorrow').click(function(e) {
        borrow = $('#deleteBorrowModal').attr('data-borrow');
        let data = {
            borrow_id: borrow
        };
        $.ajax({
            url: 'http://localhost:5500/deleteBorrow',
            type: 'POST',
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function(res) {
                console.log("res", res);
                fetchBorrows();
                $('#deleteBorrowModal').modal('hide');
                toastr.success('Prestamo eliminado.', 'Prestamo eliminado');
            },
            error: function(xhr, status, error) {
                // Ocurrió un error durante la solicitud
                console.log("error", error);
            }
        });
    });

});
