let uriGama="http://129.151.102.254:8080/api/Gama";


function traerInformacionGama(){
    $("#resultadoGama").empty();
    $.ajax({
        url:uriGama+"/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
              //Acá se puede validar la respuesta.
              pintarRespuestaGama(respuesta);
            
        }
  });
}

function pintarRespuestaGama(respuesta) {
    let myTable = "<table><tr><th>Nombre</th><th>Descripcion</th><th>Carros</th></tr>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        if (respuesta[i].cars.length > 0) {
            myTable += "<td rowspan=" + respuesta[i].cars.length + ">" + respuesta[i].name + "</td>";
            myTable += "<td rowspan=" + respuesta[i].cars.length + ">" + respuesta[i].description + "</td>";
        } else {
            myTable += "<td>" + respuesta[i].name + "</td>";
            myTable += "<td>" + respuesta[i].description + "</td>";
        }
            if (respuesta[i].cars.length > 0) {
                for (j = 0; j < respuesta[i].cars.length; j++) {
                    myTable += "<td>" + respuesta[i].cars[j].name + "--" + respuesta[i].cars[j].brand + "--" + respuesta[i].cars[j].year + "--" + respuesta[i].cars[j].description;
                    myTable +="<td> <button onclick='borrarGama("+respuesta[i].idGama+")'>Borrar</button></td>";
                    myTable +="<td> <button onclick='obtenerItemEspecificoGama("+respuesta[i].idGama+")'>Editar</button></td>";
                    myTable += "</tr>";
                }
            } else {
                for (j = 0; j < 1; j++) {
                    let data = " ";
                    myTable += "<td>" + data;
                    myTable+="<td> <button onclick='borrarGama("+respuesta[i].idGama+")'>Borrar</button>";
                    myTable+="<td> <button onclick='obtenerItemEspecificoGama("+respuesta[i].idGama+")'>Editar</button></td>";
                    myTable += "</tr>";
                }
            }

        }
        myTable += "</table>";
        $("#resultadoGama").append(myTable);
    }
    
function guardarInformacionGama(){
    if ($("#name").val().length===0 || $("#description").val().length===0){

        alert("Todos los campos son obligatorios");
    }else{
    let myData={
        name:$("#name").val(),
        description:$("#description").val()
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:uriGama+"/save",
        contentType: "application/json; charset=utf-8",
        type:"POST",
        data:dataToSend,
        datatype:"JSON",
        success:function(respuesta){
           // $("#resultadoGama").empty();
            //$("#name").val("");
            //$("#description").val("");
            window.location.reload()
            alert("La gama se ha guardado correctamente");
        }
    });}
}

function editarInfoGama(idElemento){
  
    let myData={
        idGama:$("#idGama2").val(),
        name:$("#name2").val(),
        description:$("#description2").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:uriGama+"/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoGama").empty();
            $("#idGama2").val("");
            $("#name2").val("");
            $("#description2").val("");
            traerInformacionGama();
            alert("La gama se ha actualizado correctamente")
        }
    });
  
}

function borrarGama(idElemento){
    let myData={
        idGama:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:uriGama+"/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoGama").empty();
            traerInformacionGama();
            alert("La gama se ha eliminado correctamente")
        }
    });

}

function obtenerItemEspecificoGama(idElemento){
    $.ajax({
        datatype:"JSON",
        url:uriGama+"/"+idElemento,
        type:"GET",
        success: function(respuesta){
            console.log(respuesta);
            var item=respuesta;
            $("#idGama2").val(item.idGama);
            $("#name2").val(item.name);
            $("#description2").val(item.description);
        }
    });
}
function cargarGama(){
    $.ajax({
        url:uriGama+"/all",
        type:"GET",
        datatype:"JSON",
        success:function(datos){
                if (datos === null) {//Validación de datos nulos
                    alert("No hay gamas para mostrar");
                    return
                    } else {
                        for(i=0;i<datos.length;i++){
                            $("#selectGama").append("<option type='number' value=" + datos[i].idGama + ">" 
                                             + datos[i].name + "</option>");
                            } 
                       }
                    }
});
}


