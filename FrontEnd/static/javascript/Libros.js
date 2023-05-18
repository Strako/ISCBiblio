//js file from Libros
//-----------JocznHM----------
$(document).ready(function() {
    console.log("jquery is ready");
    //var Token
    fetchBooks();
  //? ----------------------------AJAX functions--------------------------------------

    //function to get all the books from the db
    function fetchBooks(){
      $.ajax({
        url: 'http://localhost:5500/getBooks',
        type: 'GET',
        success: function(res) {
          let books = res;
          let template = '';
          books.forEach(book => {
            template += `
              <tr bookId="${book.book_id}" value="${book.book_id}">
                <th>${book.book_id}</th>
                <th>
                    ${book.title}
                </th>
                <th>${book.author}</th>
                <th>${book.quantity}</th>
                <th>
                  <div class="button-container">
                    <button type="button" id="editBookButton" class="btn btn-outline-primary" role="button" data-target="#editBookModal">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                      </svg>
                    </button>
                  </div>
                  <div class="button-container">
                    <button type="button" id="deleteBookButton" class="btn btn-outline-danger" role="button"  data-target="#deleteBookModal">
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
          $('#tbody').html(template);
        },
        error: function(xhr, status, error) {
          // Ocurrió un error durante la solicitud
          console.log("error", error);
        }
      });
    }
    /**/

    //function to search for books using any data from a book
    $('#search').keyup(function(e) {
      let search = $('#search').val();
      //ajax request to get books using any book data
      $.ajax({
        url: 'http://localhost:5500/searchBook',
        type: 'POST',
        data: {search},
        success: function(res) {
          let books = res;
          if(res.length<1){
            fetchBooks();
          }
          else{
            let template = '';
            books.forEach(book => {
              template += `
                <tr bookId="${book.book_id}">
                  <th>${book.book_id}</th>
                  <th>
                      ${book.title}
                  </th>
                  <th>${book.author}</th>
                  <th>${book.quantity}</th>
                  <th>
                    <div class="button-container">
                      <button type="button" class="btn btn-outline-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                        </svg>
                      </button>
                    </div>
                    <div class="button-container">
                      <button type="button" class="btn btn-outline-danger">
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
            $('#tbody').html(template);
          }
        },
        error: function(xhr, status, error) {
          // Ocurrió un error durante la solicitud
          console.log("error", error);
        }
      });
    });

         //function to add a book
    $('#addBook').click(function(e) {
      let postData = {
        title: $('#titulo').val(),
        author: $('#autor').val(),
        quantity: $('#cant').val()
      };
      //console.log(postData);
      $.ajax({
        url: 'http://localhost:5500/addBook',
        type: 'POST',
        data: JSON.stringify(postData),
        dataType: "json",
        contentType: "application/json",
        success: function(res) {
          //console.log(res);
          fetchBooks();
          $('#addBookModal').modal('hide');
          toastr.success('Libro agregado al catálogo de libros.', 'Libro agregado');
        },
        error: function(xhr, status, error) {
          // Ocurrió un error durante la solicitud
          console.log("error", error);
        }
      });
    });


    //funcion para obtener el bookid de un libro
    $(document).on('click', '#editBookButton', function(e) {
      // Obtener el id del libro
      bookId = $(this).closest('tr').attr('bookId');
      $('#editBookModal').attr('data-bookId', bookId);
      //console.log("bookId", bookId);
      $('#editBookModal').modal('show');
    });
    //function to edit a book
    $('#saveChangesBook').click(function(e) {
      bookId = $('#editBookModal').attr('data-bookId');
      let postData = {
        "book_id": bookId,
          title: $('#newTitle').val(),
          author: $('#newAuthor').val(),
          quantity: $('#newCant').val()
        };
      //se hace la peticion ajax para editar el libro
      $.ajax({
        url: 'http://localhost:5500/updateBook',
        type: 'POST',
        data: JSON.stringify(postData),
        contentType: 'application/json',
        success: function(res) {
          console.log("res", res);
          $('#editBookModal').modal('hide');
          fetchBooks();
          toastr.success('Los datos del libro fueron editados con exito.', 'Libro editado');
        },
        error: function(xhr, status, error) {
          // Ocurrió un error
          console.log("error", error);
        }
      });
    });


    //funcion para eliminar un libro
    $(document).on('click', '#deleteBookButton', function(e) {
      bookId = $(this).closest('tr').attr('bookId');
      $('#deleteBookModal').attr('data-bookId', bookId);
      //console.log("bookId", bookId);
      $('#deleteBookModal').modal('show');
    });
    //function to delete a book
    $('#deleteBook').click(function(e) {
      bookId = $('#deleteBookModal').attr('data-bookId');
      let postData = {
        "book_id": bookId
      };
      //console.log(postData);
      //se hace la peticion ajax para eliminar el libro
      $.ajax({
        url: 'http://localhost:5500/deleteBook',
        type: 'POST',
        data: JSON.stringify(postData),
        contentType: 'application/json',
        success: function(res) {
          console.log("res", res);
          $('#deleteBookModal').modal('hide');
          fetchBooks();
          toastr.success('El libro fue eliminado del catálogo.', 'Libro eliminado');
        },
        error: function(xhr, status, error) {
          // Ocurrió un error
          console.log("error", error);
        }
      });
    });


  });
