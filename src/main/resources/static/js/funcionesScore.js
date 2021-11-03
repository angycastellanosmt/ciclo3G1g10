let uriReservation = "http://129.151.102.254:8080/api/Reservation";
let uriScore = "http://129.151.102.254:8080/api/Score";

function autoInicioReserva(){
    console.log("se esta ejecutando");
    $.ajax({
        url:uriReservation+"/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#selectReservation");
            $.each(respuesta, function (idReservation, idReservation) {
                $select.append('<option value='+idReservation.idReservation+'>'+idReservation.idReservation+'</option>');
                console.log("select "+idReservation.idReservation);
            }); 
        }
    
    });
}

function traerInformacionCalificacion(){
    $("#resultadoCalificacion").empty();
    $.ajax({
        url:uriScore+"/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
              //Acá se puede validar la respuesta.
              pintarRespuestaCalif(respuesta);
            
        }
  });
}

function pintarRespuestaCalif(respuesta){
    let myTable ="<table><tr><th>Mensaje</th><th>Estrellas</th><th>Reservación</th></tr>";
for (i=0;i<respuesta.length;i++){
    myTable +="<tr>";
    myTable +="<td>"+respuesta[i].messageText+"</td>";
    myTable +="<td>"+respuesta[i].stars+"</td>";
    myTable +="<td>"+respuesta[i].reservation.idReservation+"</td>";
    myTable +="<td> <button onclick='borrarElementoCalif("+respuesta[i].idScore+")'>Borrar</button></td>";
    myTable +="<td> <button onclick='obtenerItemEspecificoCalif("+respuesta[i].idScore+")'>Editar</button></td>";
    myTable +="</tr>";
}
myTable +="</table>";
$("#resultadoCalificacion").append(myTable);
}

function guardarInformacionCalificacion(){
    if($("#messagetext").val().length === 0 || $("#stars").val().length === 0 || $("#selectReservation").val().length === 0){
       alert("Todos los campos son obligatorios");
    }else{
        let reservation= {idReservation:$("#selectReservation").val()};
    let myData={
        messageText:$("#messagetext").val(),
        stars:$("#stars").val(),
        reservation: reservation
    };
    console.log(reservation);
    let dataToSend=JSON.stringify(myData);
    console.log(myData);
    
    $.ajax({
        url:uriScore+"/save",
        contentType: "application/json; charset=utf-8",
        type:"POST",
        data:dataToSend,
        datatype:"JSON",
        encode:true,
        success:function(respuesta){
            $("#resultadoCalificacion").empty();
            $("#messagetext").val("");
            $("#stars").val("");
            alert("La calificación se ha guardado correctamente");
        }
    });
}
}

function obtenerItemEspecificoCalif(idElemento){
    $.ajax({
        datatype:"JSON",
        url:uriScore+"/"+idElemento,
        type:"GET",
        success: function(respuesta){
            console.log(respuesta);
            var item=respuesta;
            $("#idScore2").val(item.idScore);
            $("#messagetext2").val(item.messageText);
            $("#stars2").val(item.stars);
            $("#selectReservation2").val(item.reservation.idReservation);
        }
    });
}

function editarInformacionCalif(){
    let myData={
        idScore:$("#idScore2").val(),
        messageText:$("#messagetext2").val(),
        stars:$("#stars2").val(),
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:uriScore+"/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCalificacion").empty();
            $("#idScore2").val("");
            $("#messagetext2").val("");
            $("#stars2").val("");
            $("#selectReservation2").val(0);
            traerInformacionCalificacion();
            alert("La calificación se ha actualizado");
        }
    });
}

function borrarElementoCalif(idElemento){

    let myData={
        id:idElemento
    };

    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url:uriScore+"/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCalificacion").empty();
            traerInformacionCalificacion();
            alert("La calificación se ha eliminado");
        }
    });

}
