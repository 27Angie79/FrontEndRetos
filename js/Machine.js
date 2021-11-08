function autoInicioRelacionCategoria() {
    console.log("Se esta ejecutando");
    $.ajax({
        url:"http://129.151.100.76:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);

            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<Option value = ' + name.id +'>' + name.name + '</Option>');
                console.log("select" + name.id)  
            });
        }
    });
}

function traerInformacionMachines() {
    $.ajax({
        url:"http://129.151.100.76:8080/api/Machine/all",
        type:"GET",
        datatype:"JSON",
        success:function(response){
            console.log(response);
            pintarRespuestaMachines(response);
        }
    });
}

function pintarRespuestaMachines(response) {
    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>NOMBRE</th><th>MARCA</th><th>AÑO</th><th>DESCRIPCION</th><th colspan='3'></th></tr></thead>";
    for(i=0;i<response.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+response[i].name+"</td>";
        myTable+="<td>"+response[i].brand+"</td>";
        myTable+="<td>"+response[i].year+"</td>";
        myTable+="<td>"+response[i].description+"</td>";
        myTable+="<td>"+response[i].category.name+"</td>";
        myTable+="<td> <button class='ui yellow button' onclick=' actualizar("+response[i].id+")'>Actualizar</button></td>";
        myTable+="<td> <button class='ui red button' onclick='cargarDatosMachine("+response[i].id+")'>Editar</button></td>";
        myTable+="<td> <button class='ui red button' onclick='borrar("+response[i].id+")'>Borrar</button></td>";

        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaMachines").html(myTable);
}

function cargarDatosMachine(id) {
    console.log(id);
    $.ajax({
        datatype:'json',
        url:"http://129.151.100.76:8080/api/Machine/" + id,
        type:"GET",
        success:function(response){
            console.log(response);
            var item = response;
            console.log(item.name);
            $("#id").val(item.id) ;
            console.log(item.id);
            $("#Mname").val(item.name);
            console.log(item.name);
            $("#Mbrand").val(item.brand);
            console.log(item.brand);
            $("#Myear").val(item.year);
            $("#Mdescription").val(item.description);
            $("#select-category").val(item.category.id);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error desconocido");
    
        }
    });
}


/*
function cargarDatosMachine(id) {
    
    $.ajax({
        datatype:"JSON",
        url:"http://129.151.100.76:8080/api/Machine/" + id,
        type:"GET",
        success:function(response){
            console.log(response);
            var item = response
            $("#id").val(item.id);
            $("#Mname").val(item.name);
            $("#Mbrand").val(item.brand);
            $("#Myear").val(item.year);
            $("#Mdescription").val(item.description);
            $("#select-category").val(item.category.id);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error desconocido");
    
        }
    });
    
}
*/

function guardarMachine() {
    if ($("#Mname").val().length == 0 || $("#Mbrand").val().length == 0 || $("#Myear").val().length == 0 || $("#Mdescription").val().length == 0) {
        alert("Todos los campos son obligatorios")
    } else {
        let elemento = {
            name: $("#Mname").val(),
            brand: $("#Mbrand").val(),
            year: $("#Myear").val(),
            description: $("#Mdescription").val(),
            category:{ id: + $("#select-category").val()},
        }   

        let dataToSend = JSON.stringify(elemento);
        console.log(elemento);

        $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: dataToSend,
            
            url:"http://129.151.100.76:8080/api/Machine/save",
           
            
            success:function(response) {
                console.log(response);
                $("#miListaMachines").empty();
                $("#Mname").val("");
                $("#Mbrand").val("");
                $("#Myear").val("");
                $("#Mdescription").val("");

                alert("Maquina guardada correctamente");
        
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
                alert("No se guardo correctamente");
        
            }
            });
}
}


function actualizar (idElemento) {
    if ($("#Mname").val().length == 0 || $("#Mbrand").val().length == 0 || $("#Myear").val().length == 0 || $("#Mdescription").val().length == 0) {
        alert("Todos los campos son obligatorios")
    } else {
        let elemento = {
            id:idElemento,
            name: $("#Mname").val(),
            brand: $("#Mbrand").val(),
            year: $("#Myear").val(),
            description: $("#Mdescription").val(),
            category:{ id: + $("#select-category").val()},
        }
        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            url:"http://129.151.100.76:8080/api/Machine/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            success:function(response){
                console.log(Response);
                $("#miListaMachines").empty();
                traerInformacionMachines();
                alert("Maquina actualziada correctamente ✔")
                $("#miListaMachines").empty();
                $("#id").val("");
                $("#Mname").val("");
                $("#Mbrand").val("");
                $("#Myear").val("");
                $("#Mdescription").val("");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("No se actualizo correctamente");
        
            }

        });
    }
}

function borrar(idElemento) {
    var elemento = {
        id:idElemento
    }

    var dataToSend = JSON.stringify(elemento);
    
    console.log(dataToSend);

    $.ajax({
        url:"http://129.151.100.76:8080/api/Machine/" + idElemento,
        type:"DELETE",
        datatype:"json",
        data:dataToSend,
        contentType:"application/JSON",

        success:function(response){
            console.log(response);
            $("#miListaMachines").empty();
            alert("Maquina eliminada correctamente 🗑");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se elimino correctamente");
    
        }
        });
}