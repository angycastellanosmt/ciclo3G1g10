let uriReport="http://129.151.102.254:8080/api/Reservation/";


function traerReporteStatus(){
    console.log("test");
    $.ajax({
        url:uriReport+"report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}
function pintarRespuesta(respuesta){

    let myTable="<table><tr><th>completadas</th><th>canceladas</th></tr>";
    myTable+="<tr>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";
    myTable+="</table>";
    $("#resultadoStatus").append(myTable);
}

function traerReporteDate(){

    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);
    
        $.ajax({
            url:uriReport+"report-dates/"+fechaInicio+"/"+fechaCierre,
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            }
        });
    }
    function pintarRespuestaDate(respuesta){

        let myTable="<table>"
        myTable += "<tr><th>Fecha inicio Reserva</th><th>Fecha fin Reserva</th><th>Status</th></tr>"; 
        for(i=0;i<respuesta.length;i++){
            myTable +="<tr>";
            myTable +="<td>"+respuesta[i].startDate+"</td>";
            myTable +="<td>"+respuesta[i].devolutionDate+"</td>";
            myTable +="<td>"+respuesta[i].status+"</td>";
            myTable +="</tr>";
        }
        myTable+="</table>";
        $("#resultadoDate").append(myTable);
    }


 function traerReporteClientes(){
        $.ajax({
            url:uriReport+"report-clients",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaClientes(respuesta);
            }
        });
    }
    function pintarRespuestaClientes(respuesta){

        let myTable="<table><tr><th>Total</th><th>Nombre Client</th><th>Email</th><th>Edad</th>";
    
          
        for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
            myTable+="<td>"+respuesta[i].total+"</td>";
            myTable+="<td>"+respuesta[i].client.name+"</td>";
            myTable+="<td>"+respuesta[i].client.email+"</td>";
            myTable+="<td>"+respuesta[i].client.age+"</td>";
          
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoClientes").append(myTable);
    }