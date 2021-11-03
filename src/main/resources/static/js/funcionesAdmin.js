let uriAdmin = "http://129.151.102.254:8080/api/Admin";

function traerInformacionAdministr(){
    $("#resultadoAdmin").empty();
    $.ajax({
        url:uriAdmin+"/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
              //Acá se puede validar la respuesta.
              pintarRespuestaAdmin(respuesta);
            
        }
  });
}

function pintarRespuestaAdmin(respuesta){
    let myTable ="<table><tr><th>Nombre</th><th>Correo</th><th>Contraseña</th></tr>";
for (i=0;i<respuesta.length;i++){
    myTable +="<tr>";
    myTable +="<td>"+respuesta[i].name+"</td>";
    myTable +="<td>"+respuesta[i].email+"</td>";
    myTable +="<td>"+respuesta[i].password+"</td>";
    myTable +="<td> <button onclick='borrarElementoAdmin("+respuesta[i].idAdmin+")'>Borrar</button></td>";
    myTable +="<td> <button onclick='obtenerItemEspecificoAdmin("+respuesta[i].idAdmin+")'>Editar</button></td>";
    myTable +="</tr>";
}
myTable +="</table>";
$("#resultadoAdmin").append(myTable);
}

function guardarInformacionAdmin(){
    if($("#name").val().length === 0 || $("#email").val().length === 0 || $("#password").val().length === 0){
       alert("Todos los campos son obligatorios");
    }else{
        
    let myData={
        name:$("#name").val(),
        email:$("#email").val(),
        password:$("#password").val(),
    };
    let dataToSend=JSON.stringify(myData);
    console.log(myData);
    
    $.ajax({
        url:uriAdmin+"/save",
        contentType: "application/json; charset=utf-8",
        type:"POST",
        data:dataToSend,
        datatype:"JSON",
        encode:true,
        success:function(respuesta){
            $("#resultadoAdmin").empty();
            $("#name").val("");
            $("#email").val("");
            $("#password").val("");
            alert("El usuario se ha guardado correctamente");
        }
    });
}
}

function obtenerItemEspecificoAdmin(idElemento){
    $.ajax({
        datatype:"JSON",
        url:uriAdmin+"/"+idElemento,
        type:"GET",
        success: function(respuesta){
            console.log(respuesta);
            var item=respuesta;
            $("#idAdmin2").val(item.idAdmin);
            $("#name2").val(item.name);
            $("#email2").val(item.email);
            $("#password2").val(item.password);
        }
    });
}

function editarInformacionAdmin(){
    let myData={
        idAdmin:$("#idAdmin2").val(),
        name:$("#name2").val(),
        email:$("#email2").val(),
        password:$("#password2").val(),
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:uriAdmin+"/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoAdmin").empty();
            $("#idAdmin2").val("");
            $("#name2").val("");
            $("#email2").val("");
            $("#password2").val("");
            traerInformacionAdministr();
            alert("El usuario se ha actualizado");
        }
    });
}

function borrarElementoAdmin(idElemento){

    let myData={
        id:idElemento
    };

    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url:uriAdmin+"/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoAdmin").empty();
            traerInformacionAdministr();
            alert("El usuario se ha eliminado");
        }
    });

}
