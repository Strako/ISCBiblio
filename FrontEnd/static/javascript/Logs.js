//js de logs en el sistema
$(document).ready(function() {
    console.log("jquery ok");
    fetchLogs();
//funcion para obtener los logs
    function fetchLogs() {
        console.log("fetching logs from server....");
        $.ajax({
            url: 'http://localhost:5500/getLogs',
            type: 'GET',
            success: function(res) {
                console.log("res", res);
                let logs = res;
                let logsTemplate = '';
                logs.forEach(log => {
                    logsTemplate += `
                        <tr>
                            <th scope="col">${log.log_id}</th>
                            <th scope="col">${log.log}</th>
                        </tr>
                    `
                });
                $('#logs').html(logsTemplate);
            },
            error: function(xhr, status, error) {
                // Ocurrió un error durante la solicitud
                console.log("error", error);
            }
        });
    }


});
