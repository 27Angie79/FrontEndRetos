function autoInicioRelacionCliente() {
    console.log(autoInicioRelacionCliente)
    $.ajax({
        url:"http://129.151.100.76:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                console.log("Se esta iterando" + name.name);
                $select.append('<Option value = ' + name.idClient +'>' + name.name + '</Option>');
            });
        }
    });

}

function autoInicioRelacionMachine() {
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

function autoInicioMensajes() {
    console.log("Se está ejecutando")
    $.ajax({
        url:"http://129.151.100.76:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            console.log(respuesta)
            pintarRespuestaMensajes(respuesta);
        }
    });
}

function pintarRespuestaMensajes(respuesta) {
    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>MENSAJE</th><th>MAQUINA</th><th>CLIENTE</th><th colspan='3'></th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        let messageText = respuesta[i].messageText? respuesta[i].messageText: null;
        let machineName = respuesta[i].machine? respuesta[i].machine.name: null;
        let clienteName = respuesta[i].client? respuesta[i].client.name: null;
        myTable+="<tr>";
        myTable+="<td>"+ respuesta[i].idMessage + "</td>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].machineName+"</td>";
        myTable+="<td>"+respuesta[i].clienteName+"</td>";
        myTable+="<td> <button class='ui yellow button' onclick=' actualizarInformacionMensajes("+respuesta[i].idMessage+")'>Actualizar</button>";
        myTable+="<td> <button class='ui red button' onclick='borrarMensajes("+respuesta[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMensajes").html(myTable);
}

function guardarInformacionMensajes() {
    if ($("#messageText").val().length == 0) {
        alert("Todos los campos son obligatorios")
    } else {
        let var2 = {
            messageText: $("#messageText").val(),
            machine: {id: + $("#select-machine").val()},
            client: {idClient: + $("#select-client").val()},
        };
        console.log(var2);

        $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            
            url:"http://129.151.100.76:8080/api/Message/save",
           
            
            success:function(response) {
                console.log(response);
                console.log("Se guardo correctamente");
                alert("Mensaje guardado correctamente");
                window.location.reload()
        
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
                  window.location.reload()
                alert("No se guardo correctamente");
        
        
            }
            });
    }
}

function actualizarInformacionMensajes(idElemento) {
    let myData = {
        idMessage:idElemento,
        messageText: $("#messageText").val(),
        machine: {id: + $("#select-machine").val()},
        client: {idClient: + $("#select-client").val()},
    }
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.100.76:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function (respuesta) {
            $("#resultadoMessage").empty();
            $("#messageText").val(""),
            autoInicioMensajes();
            alert("Mensaje actualizado correctamente :)")
        }
    });
}

function borrarMensajes(idElemento){
    let myData={
        idMessage: idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.100.76:8080/api/Message/" + idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMessage").empty();
            autoInicioMensajes();
            alert("Mensaje eliminado correctamente ✔")
        }
    });

}