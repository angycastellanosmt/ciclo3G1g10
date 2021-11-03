let uriMessage="http://129.151.102.254:8080/api/Message";
let uriClient="http://129.151.102.254:8080/api/Client";
let uriCar="http://129.151.102.254:8080/api/Car";

function autoInicioRelacionCliente(){
    
    $.ajax({
        url:uriClient+"/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
          
            let $select = $("#selectClient");
            $.each(respuesta, function (idClient, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}

function autoInicioCar(){

    $.ajax({
        url:uriCar+"/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
            let $select = $("#selectCar");
            $.each(respuesta, function (idCar, name) {
                $select.append('<option value='+name.idCar+'>'+name.name+'</option>');
         
            }); 
        }
    
    })
}

function traerInformacionMensaje(){
    $("#resultadoMensaje").empty();
    $.ajax({
        url:uriMessage+"/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
              //Acá se puede validar la respuesta.
              pintarRespuestaMensaje(respuesta);
            
        }
  });
}

function pintarRespuestaMensaje(respuesta){
    let myTable ="<table><tr><th>Mensaje</th><th>Carro</th><th>Cliente</th></tr>";
for (i=0;i<respuesta.length;i++){
    myTable +="<tr>";
    myTable +="<td>"+respuesta[i].messageText+"</td>";
    myTable +="<td>"+respuesta[i].car.name+"</td>";
    myTable +="<td>"+respuesta[i].client.name+"</td>";
    myTable +="<td> <button onclick='borrarElementoMens("+respuesta[i].idMessage+")'>Borrar</button></td>";
    myTable +="<td> <button onclick='obtenerItemEspecificoMens("+respuesta[i].idMessage+")'>Editar</button></td>";
    myTable +="</tr>";
}
myTable +="</table>";
$("#resultadoMensaje").append(myTable);
}

function guardarInformacionMensaje(){
    if ($("#messageText").val().length===0 ){

        alert("Todos los campos son obligatorios");
    }else{
    let myData={
        messageText:$("#messageText").val(),
        car:{idCar: +$("#selectCar").val()},
        client:{idClient: +$("#selectClient").val()},
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:uriMessage+"/save",
        contentType: "application/json; charset=utf-8",
        type:"POST",
        data:dataToSend,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMensaje").empty();
            $("#messageText").val("");
            $("#selectCar").val("");
            $("#selectClient").val("");
            alert("El mensaje se ha guardado correctamente");
        }
    });
}
}

function editarInformacionMensajes(){
    let myData={
        idMessage:$("#idmensajes2").val(),
        messageText:$("#messagetext2").val(),
        //car:$("#selectCar2").val(),
        //client:$("#selectClient2").val()
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:uriMessage+"/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMensajes").empty();
            $("#idmensajes2").val("");
            $("#messagetext2").val("");
            $("#selectClient2").val("");
            $("#selectCar2").val("");
            traerInformacionMensaje();
            alert("El mensaje se ha actualizado")
        }
    });
}

function borrarElementoMens(idElemento){

    let myData={
        idMessage:idElemento
    };

    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url:uriMessage+"/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMensajes").empty();
            traerInformacionMensaje();
            alert("El mensaje se ha Eliminado");
        }
    });

}

function obtenerItemEspecificoMens(idElemento){
    $.ajax({
        datatype:"JSON",
        url:uriMessage+"/"+idElemento,
        type:"GET",
        success: function(respuesta){
            console.log(respuesta);
            var item=respuesta;
            $("#idmensajes2").val(item.idMessage);
            $("#messagetext2").val(item.messageText);
            $("#selectClient2").val(item.client.name);
            $("#selectCar2").val(item.car.name);
        }
    });
}