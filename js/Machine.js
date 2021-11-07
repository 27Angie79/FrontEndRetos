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
            pintarRespuestaMachine(response);
        }
    });
}

function pintarRespuestaMachines(response) {
    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>NOMBRE</th><th>MARCA</th><th>AÑO</th><th>DESCRIPCION</th><th colspan='3'></th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].category.name+"</td>";
        myTable+="<td> <button class='ui yellow button' onclick=' actualizar("+respuesta[i].id+")'>Actualizar</button></td>";
        myTable+="<td> <button class='ui red button' onclick='cargarDatosMachine("+respuesta[i].id+")'>Editar</button></td>";
        myTable+="<td> <button class='ui red button' onclick='borrar("+respuesta[i].id+")'>Borrar</button></td>";

        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaMachines").html(myTable);
}

function cargarDatosMachine(id) {
    $.ajax({
        url:"http://129.151.100.76:8080/api/Machine/" + id,
        type:"GET",
        datatype:"JSON",
        success:function(response){
            console.log(response);
            var item = response
            $("#id").val(item.id);
            $("#Mname").val(item.name.split("T")[0]);
            $("#Mbrand").val(item.brand);
            $("#Myear").val(item.year);
            $("#Mdescription").val(item.description);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error desconocido");
    
        }
    });
}

function guardarMachine() {
    if ($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0) {
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


function actualizar(params) {
    
}