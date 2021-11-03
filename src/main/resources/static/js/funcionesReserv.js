let uriReservation = "http://129.151.102.254:8080/api/Reservation";
let uriClient = "http://129.151.102.254:8080/api/Client";
let uriCar = "http://129.151.102.254:8080/api/Car";



function autoInicioRelacionCliente() {

    $.ajax({
        url: uriClient + "/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            let $select = $("#selectClient");
            $.each(respuesta, function (idClient, name) {
                $select.append('<option value=' + name.idClient + '>' + name.name + '</option>');

            });
        }

    });
}

function autoInicioCar() {

    $.ajax({
        url: uriCar + "/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {

            let $select = $("#selectCar");
            $.each(respuesta, function (idCar, name) {
                $select.append('<option value=' + name.idCar + '>' + name.name + '</option>');

            });
        }

    })
}

function traerInformacionReservacion() {
    $("#resultadoReservacion").empty();
    $.ajax({
        url: uriReservation + "/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            //Acá se puede validar la respuesta.
            pintarRespuestaReservacion(respuesta);

        }
    });
}

function pintarRespuestaReservacion(respuesta) {
    let myTable = "<table><tr><th>Fecha Inicio</th><th>Fecha devolucion</th><th>Estado</th><th>Carro</th><th>Cliente</th></tr>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].startDate + "</td>";
        myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
        myTable += "<td>" + respuesta[i].status + "</td>";
        myTable += "<td>" + respuesta[i].car.name + "</td>";
        myTable += "<td>" + respuesta[i].client.name + "</td>";
        myTable += "<td> <button onclick='borrarReserva(" + respuesta[i].idReservation + ")'>Borrar</button></td>";
        myTable += "<td> <button onclick='obtenerItemEspecifico(" + respuesta[i].idReservation + ")'>Editar</button></td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoReservacion").append(myTable);
}

function guardarInformacionReservacion() {
    if ($("#startDate").val().length === 0 || $("#devolutionDate").val().length === 0 || $("#status").val().length === 0 || $("#selectClient").val.length === 0 || $("#selectCar").val.length === 0) {
        alert("Todos los campos son Obligatorios")
    } else {
        if ($("#startDate").val() > $("#devolutionDate").val()) {
            alert("La fecha de devolución no puede ser anterior a la fecha de inicio")
        } else {
            let myData = {
                startDate: $("#startDate").val(),
                devolutionDate: $("#devolutionDate").val(),
                status: $("#status").val(),
                car: {idCar: +$("#selectCar").val()},
                client: {idClient: +$("#selectClient").val()},
            };

            let dataToSend = JSON.stringify(myData);
            $.ajax({
                url: uriReservation + "/save",
                contentType: "application/json; charset=utf-8",
                type: "POST",
                data: dataToSend,
                datatype: "JSON",
                success: function (respuesta) {
                    $("#resultadoReservacion").empty();
                    $("#startDate").val("");
                    $("#devolutionDate").val("");
                    $("#status").val("");
                    alert("La reserva se ha guardado correctamente");
                }
            });
        }
    }
}

    function actualizarReservation() {

        let elemento = {
            idReservation: $("#idReservation2").val(),
            startDate: $("#startDate2").val(),
            devolutionDate: $("#devolutionDate2").val(),
            status: $("#status2").val(),
            //car:{id: +$("#selectCar2").val()},
            //client:{idClient: +$("#selectClient2").val()},
        }

        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url: uriReservation + "/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#resultadoReservacion").empty();
                $("#startDate2").val("");
                $("#devolutionDate2").val("");
                $("#status2").val("");
                traerInformacionReservacion();
                alert("La reserva se ha actualizado Correctamente!");
            }
        });
    }

    function borrarReserva(idElemento) {
        let elemento = {
            idReservation: idElemento
        }
        let dataToSend = JSON.stringify(elemento);

        $.ajax(
                {
                    dataType: 'json',
                    data: dataToSend,
                    url: uriReservation + "/" + idElemento,
                    type: 'DELETE',
                    contentType: "application/JSON",
                    success: function (response) {
                        console.log(response);
                        $("#resultadoReservacion").empty();
                        alert("La reserva se ha eliminado")
                    }
                });
    }

    function obtenerItemEspecifico(idElemento) {
        $.ajax({
            dataType: 'json',
            url: uriReservation + "/" + idElemento,
            type: 'GET',

            success: function (respuesta) {
                console.log(respuesta);
                var item = respuesta;
                $("#idReservation2").val(item.idReservation);
                $("#startDate2").val(item.startDate.value);
                $("#devolutionDate2").val(item.devolutionDate.value);
                $("#status2").val(item.status);
                $("#selectClient2").val(item.client.name);
                $("#selectCar2").val(item.car.name);

            }
        });
    }


