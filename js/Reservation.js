function autoInicioRelacionCliente() {
    $.ajax({
        url:"http://129.151.100.76:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<Option value = ' + name.idClient +'>' + name.name + '</Option>');
            });
        }
    });

}

function autoTraerMachine() {
    $.ajax({
        url:"http://129.151.100.76:8080/api/Machine/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            let $select = $("#select-machine");
            $.each(respuesta, function (id, name) {
                $select.append('<Option value = ' + name.id +'>' + name.name + '</Option>');
            });
        }
    });
}

function guardarReservacion() {
    if ($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0) {
        alert("Todos los campos son obligatorios")
    } else {
        let elemento = {
            startDate: $("#starDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            machine:{ id: + $("#select-machine").val()},
            client:{ idClient: + $("#select-client").val()},
        }

        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: dataToSend,
            
            url:"http://129.151.100.76:8080/api/Reservation/save",
           
            
            success:function(response) {
                console.log(response);
                $("#resultado5").empty();
                $("#starDate").val(""),
                $("#devolutionDate").val(""),
                $("#status").val(""),

                alert("Reservacion guardada correctamente");
        
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
                alert("No se guardo correctamente");
        
            }
            });
    }
}

function listarReservaciones() {
    $.ajax({
        url:"http://129.151.100.76:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            console.log(respuesta)
            pintarRespuestaReservation(respuesta);
        }
    });
}

function pintarRespuestaReservation(respuesta) {
    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>FECHA DE INICIO</th><th>FECHA DE CIERRE</th><th>ESTADO</th><th colspan='3'></th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+ respuesta[i].startDate.split("T")[0] + "</td>";
        myTable+="<td>"+respuesta[i].devolutionDate.split("T")[0]+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].machine.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td> <button class='ui yellow button' onclick=' actualizarReservacion("+respuesta[i].idReservation+")'>Actualizar</button>";
        myTable+="<td> <button class='ui red button' onclick='borrarReservacion("+respuesta[i].idReservation+")'>Borrar</button>";
        myTable+="<td> <button class='ui red button' onclick='cargarDatosReservacion("+respuesta[i].idReservation+")'>Detalles</button>";
        myTable+="</tr>";
    };
    myTable+="</table>";
    $("#miListaReservacion").html(myTable);
}