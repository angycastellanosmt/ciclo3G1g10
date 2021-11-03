let uriCar="http://129.151.102.254:8080/api/Car";
let uriGama="http://129.151.102.254:8080/api/Gama";

function autoInicioGama(){
    console.log("se esta ejecutando");
    $.ajax({
        url:uriGama+"/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#selectGama");
            $.each(respuesta, function (idGama, name) {
                $select.append('<option value='+name.idGama+'>'+name.name+'</option>');
                console.log("select "+name.idGama);
            }); 
        }
    
    });
}


function traerInformacionCarros(){
    $("#resultadoCarros").empty();
    $.ajax({
        url:uriCar+"/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
              //Acá se puede validar la respuesta.
              pintarRespuestaCarros(respuesta);
            
        }
  });
}

function pintarRespuestaCarros(respuesta){
    let myTable ="<table><tr><th>Nombre</th><th>Marca</th><th>Año</th><th>Descripcion</th><th>Gama</th></tr>";
for (i=0;i<respuesta.length;i++){
    myTable +="<tr>";
    myTable +="<td>"+respuesta[i].name+"</td>";
    myTable +="<td>"+respuesta[i].brand+"</td>";
    myTable +="<td>"+respuesta[i].year+"</td>";
    myTable +="<td>"+respuesta[i].description+"</td>";
    myTable +="<td>"+respuesta[i].gama.name+"</td>";
    myTable +="<td> <button onclick='borrarElementoCar("+respuesta[i].idCar+")'>Borrar</button></td>";
    myTable +="<td> <button onclick='obtenerItemEspecificoCar("+respuesta[i].idCar+")'>Editar</button></td>";
    myTable +="</tr>";
}
myTable +="</table>";
$("#resultadoCarros").append(myTable);
}

function guardarInformacionCarros(){
    if($("#cname").val().length === 0 || $("#brand").val().length === 0 || $("#year").val().length === 0 || $("#cdescription").val().length === 0 || $("#selectGama").val().length === 0){
       alert("Todos los campos son obligatorios");
    }else{
        let gama= {idGama:$("#selectGama").val()};
    let myData={
        name:$("#cname").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#cdescription").val(),
        gama: gama
    };
    console.log(gama);
    let dataToSend=JSON.stringify(myData);
    console.log(myData);
    
    $.ajax({
        url:uriCar+"/save",
        contentType: "application/json; charset=utf-8",
        type:"POST",
        data:dataToSend,
        datatype:"JSON",
        encode:true,
        success:function(respuesta){
            $("#resultadoCarros").empty();
            $("#cname").val("");
            $("#brand").val("");
            $("#year").val("");
            $("#cdescription").val("");
            alert("El carro se ha guardado correctamente");
        }
    });
}
}

function editarInformacionCarros(){
    //let gama= {idGama:$("#selectGama").val()};
    let myData={
        idCar:$("#idcar2").val(),
        name:$("#cname2").val(),
        brand:$("#brand2").val(),
        year:$("#year2").val(),
        description:$("#cdescription2").val(),
      //  gama:{idGama:$("#selectGama").name.val()}
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:uriCar+"/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCarros").empty();
            $("#idcar2").val("");
            $("#cname2").val("");
            $("#brand2").val("");
            $("#year2").val("");
            $("#description2").val("");
            $("#selectGama2").val(0);
            traerInformacionCarros();
            alert("El carro se ha actualizado");
        }
    });
}


function borrarElementoCar(idElemento){

    let myData={
        id:idElemento
    };

    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url:uriCar+"/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCarros").empty();
            traerInformacionCarros();
            alert("El carro se ha eliminado");
        }
    });

}

function obtenerItemEspecificoCar(idElemento){
    $.ajax({
        datatype:"JSON",
        url:uriCar+"/"+idElemento,
        type:"GET",
        success: function(respuesta){
            console.log(respuesta);
            var item=respuesta;
            $("#idcar2").val(item.idCar);
            $("#cname2").val(item.name);
            $("#brand2").val(item.brand);
            $("#year2").val(item.year);
            $("#cdescription2").val(item.description);
            $("#selectGama2").val(item.gama.name);
        }
    });
}




