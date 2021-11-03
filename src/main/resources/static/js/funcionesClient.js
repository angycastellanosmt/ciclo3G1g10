let uriClient="http://129.151.102.254:8080/api/Client";

function traerInformacionClientes(){
    $("#resultadoClientes").empty();
    $.ajax({
        url:uriClient+"/all",
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
    myTable +="<td> <button onclick='borrarClientes("+respuesta[i].idClient+")'>Borrar</button></td>";
    myTable +="<td> <button onclick='obtenerItemEspecifico("+respuesta[i].idClient+")'>Editar</button></td>";
    myTable +="</tr>";
}
myTable +="</table>";
$("#resultadoClientes").append(myTable);
}

function guardarInformacionClientes(){
     if($("#email").val().length === 0 || $("#password").val().length === 0 || $("#clname").val().length === 0 || $("#age").val().length===0){
        alert("Todos los campos son Obligatorios")
    }else{  
   
    let myData={
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#clname").val(),
        age:$("#age").val(),
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:uriClient+"/save",
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
}

function editarInfoClientes(){
    let myData={
        idClient:$("#idClient2").val(),
        email:$("#email2").val(),
        password:$("#password2").val(),
        name:$("#clname2").val(),
        age:$("#age2").val(),
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:uriClient+"/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoClientes").empty();
            $("#idClient2").val("");
            $("#clname2").val("");
            $("#email2").val("");
            $("#password2").val("");
            $("#age2").val("");
            traerInformacionClientes();
            alert("El cliente se ha actualizado")
        }
    });
}

function borrarClientes(idElemento){

    let myData={
        idClient:idElemento
    };

    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:uriClient+"/"+ idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoClientes").empty();
            traerInformacionClientes();
            alert("El cliente se ha Eliminado")
        }
    });

}

function obtenerItemEspecifico(idElemento){
    $.ajax({
        datatype:"JSON",
        url:uriClient+"/"+idElemento,
        type:"GET",
        success: function(respuesta){
            console.log(respuesta);
            var item=respuesta;
            $("#idClient2").val(item.idClient);
            $("#clname2").val(item.name);
            $("#email2").val(item.email);
            $("#password2").val(item.password);
            $("#age2").val(item.age);
        }
    })
}


