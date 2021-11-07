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

function cargarDatosMachine() {
    
}


function actualizar(params) {
    
}