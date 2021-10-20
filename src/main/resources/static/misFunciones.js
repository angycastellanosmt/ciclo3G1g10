//////////////////////////////////////////////////
////////////////1.funciones para Gamas/////////////

function traerInformacionGama(){
    $("#resultadoGama").empty();
    $.ajax({
        url:"http://129.151.102.254:8080/api/Gama/all",
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
                    //myTable +="<td> <button onclick='borrarElemento("+respuesta[i].id+")'>Borrar</button></td>";
                    //myTable +="<td> <button onclick='obtenerItemEspecifico("+respuesta[i].id+")'>Editar</button></td>";
                    myTable += "</tr>";
                }
            } else {
                for (j = 0; j < 1; j++) {
                    let data = " ";
                    myTable += "<td>" + data;
                    //myTable+="<td> <button onclick='clearItemMessage("+items[i].idGama+")'>Borrar</button>";
                    //tableGama+="<td> <button onclick='itemByIDMessage("+items[i].idGama+")'>Editar</button></td>";
                    myTable += "</tr>";
                }
            }

        }
        myTable += "</table>";
        $("#resultadoGama").append(myTable);
    }
    
function guardarInformacionGama(){
    let myData={
        name:$("#name").val(),
        description:$("#description").val()
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.102.254:8080/api/Gama/save",
        contentType: "application/json; charset=utf-8",
        type:"POST",
        data:dataToSend,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoGama").empty();
            $("#name").val("");
            $("#description").val("");
            alert("La gama se ha guardado correctamente")
        }
    });
}


function cargarGama(){
    $.ajax({
        url:"http://129.151.102.254:8080/api/Gama/all",
        type:"GET",
        datatype:"JSON",
        success:function(datos){
                if (datos == null) {//Validación de datos nulos
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
//////////////////////////////////////////////////
////////////////2. funciones para Carros/////////////

function traerInformacionCarros(){
    $("#resultadoCarros").empty();
    $.ajax({
        url:"http://129.151.102.254:8080/api/Car/all",
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
    //myTable +="<td>"+respuesta[i].gama+"</td>";
    //myTable +="<td> <button onclick='borrarElemento("+respuesta[i].id+")'>Borrar</button></td>";
    //myTable +="<td> <button onclick='obtenerItemEspecifico("+respuesta[i].id+")'>Editar</button></td>";
    myTable +="</tr>";
}
myTable +="</table>";
$("#resultadoCarros").append(myTable);
}

function guardarInformacionCarros(){
    let myData={
        name:$("#cname").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#cdescription").val(),
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.102.254:8080/api/Car/save",
        contentType: "application/json; charset=utf-8",
        type:"POST",
        data:dataToSend,
        datatype:"JSON",
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

//////////////////////////////////////////////////
////////////////3. funciones para Clientes/////////////

function traerInformacionClientes(){
    $("#resultadoClientes").empty();
    $.ajax({
        url:"http://129.151.102.254:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
              //Acá se puede validar la respuesta.
              pintarRespuestaClientes(respuesta);
            
        }
  });
}

function pintarRespuestaClientes(respuesta){
    let myTable ="<table><tr><th>Correo</th><th>Contraseña</th><th>Nombre</th><th>Edad</th></tr>";
for (i=0;i<respuesta.length;i++){
    myTable +="<tr>";
    myTable +="<td>"+respuesta[i].email+"</td>";
    myTable +="<td>"+respuesta[i].password+"</td>";
    myTable +="<td>"+respuesta[i].name+"</td>";
    myTable +="<td>"+respuesta[i].age+"</td>";
    //myTable +="<td> <button onclick='borrarElemento("+respuesta[i].id+")'>Borrar</button></td>";
    //myTable +="<td> <button onclick='obtenerItemEspecifico("+respuesta[i].id+")'>Editar</button></td>";
    myTable +="</tr>";
}
myTable +="</table>";
$("#resultadoClientes").append(myTable);
}

function guardarInformacionClientes(){
    let myData={
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#clname").val(),
        age:$("#age").val(),
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.102.254:8080/api/Client/save",
        contentType: "application/json; charset=utf-8",
        type:"POST",
        data:dataToSend,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoClientes").empty();
            $("#email").val("");
            $("#password").val("");
            $("#clname").val("");
            $("#age").val("");
            alert("El cliente se ha guardado correctamente");
        }
    });
}

//////////////////////////////////////////////////
////////////////4. funciones para Mensajes/////////////

function traerInformacionMensaje(){
    $("#resultadoMensaje").empty();
    $.ajax({
        url:"http://129.151.102.254:8080/api/Message/all",
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
    //myTable +="<td>"+respuesta[i].car+"</td>";
    //myTable +="<td>"+respuesta[i].client+"</td>";
    //myTable +="<td> <button onclick='borrarElemento("+respuesta[i].id+")'>Borrar</button></td>";
    //myTable +="<td> <button onclick='obtenerItemEspecifico("+respuesta[i].id+")'>Editar</button></td>";
    myTable +="</tr>";
}
myTable +="</table>";
$("#resultadoMensaje").append(myTable);
}

function guardarInformacionMensaje(){
    let myData={
        messageText:$("#messageText").val(),
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.102.254:8080/api/Message/save",
        contentType: "application/json; charset=utf-8",
        type:"POST",
        data:dataToSend,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMensaje").empty();
            $("#messageText").val("");
            alert("El mensaje se ha guardado correctamente");
        }
    });
}


//////////////////////////////////////////////////
///////////////5. funciones para Reservaciones/////////////

function traerInformacionReservacion(){
    $("#resultadoReservacion").empty();
    $.ajax({
        url:"http://129.151.102.254:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
              //Acá se puede validar la respuesta.
              pintarRespuestaReservacion(respuesta);
            
        }
  });
}

function pintarRespuestaReservacion(respuesta){
    let myTable ="<table><tr><th>Fecha Inicio</th><th>Fecha devolucion</th></tr>";
for (i=0;i<respuesta.length;i++){
    myTable +="<tr>";
    myTable +="<td>"+respuesta[i].startDate+"</td>";
    myTable +="<td>"+respuesta[i].devolutionDate+"</td>";
    //myTable +="<td>"+respuesta[i].car+"</td>";
    //myTable +="<td>"+respuesta[i].client+"</td>";
    //myTable +="<td> <button onclick='borrarElemento("+respuesta[i].id+")'>Borrar</button></td>";
    //myTable +="<td> <button onclick='obtenerItemEspecifico("+respuesta[i].id+")'>Editar</button></td>";
    myTable +="</tr>";
}
myTable +="</table>";
$("#resultadoReservacion").append(myTable);
}

function guardarInformacionReservacion(){
    let myData={
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.102.254:8080/api/Reservation/save",
        contentType: "application/json; charset=utf-8",
        type:"POST",
        data:dataToSend,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoReservacion").empty();
            $("#startDate").val("");
            $("#devolutionDate").val("");
            alert("La reserva se ha guardado correctamente");
        }
    });
}

