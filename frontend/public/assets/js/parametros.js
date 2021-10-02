
$(document).ready(function () {


    let horainicio = document.getElementById('horainicio');
    let horafin = document.getElementById('horafin');
    let maskOptions = {
    mask: '00:00'
    };
    IMask(horainicio, maskOptions);
    IMask(horafin, maskOptions);


    $(".clickable-row").click(function () {
       
        let idParametro = $(this).find("td").eq(1).html();
        let nombre = $(this).find("td").eq(2).html();
        let valor = $(this).find("td").eq(3).html();
        let descripcion = $(this).find("td").eq(4).html();
        let fechainicio = $(this).find("td").eq(5).html();
        let fechafin = $(this).find("td").eq(6).html();
        let horainicio = $(this).find("td").eq(7).html();
        let horafin = $(this).find("td").eq(8).html();
        let institucion = $(this).find("td").eq(9).html();
        let activo = $(this).find("td").eq(10).html();
       
        let cadenahtml = $.parseHTML(activo);
        let activoBool = cadenahtml[1].checked;

        console.log(cadenahtml);
        $(this).addClass('bg-warning').siblings().removeClass('bg-warning');

        agregarValorCampos(idParametro, nombre, valor, descripcion, fechainicio, fechafin, horainicio, horafin, activoBool, institucion);

    });

    $("#btnNuevo").click(function () {
        //limpiar campos
        agregarValorCampos("", "", "", "", "", "", "", "", false);
        $("#accion").val("1");
    });

    $("#btnEditar").click(function () {
        $("#accion").val("0");
    });


   




    function agregarValorCampos(idParametro, nombre, valor, descripcion, fechainicio, fechafin, horainicio, horafin, activo, institucion) {
        $("#inputIdParametro").val(idParametro);
        $("#parametro").val(idParametro);
        $("#nombre").val(nombre);
        $("#valor").val(valor);
        $("#descripcion").val(descripcion);
        $("#fechainicio").val(fechainicio.split("-").reverse().join("-"));
        $("#fechafin").val(fechafin.split("-").reverse().join("-"));
        $("#horainicio").val(horainicio);
        $("#horafin").val(horafin);
        $("#activo").attr('checked', activo);

        $("#institucion").val(institucion.split("-")[0].trim());
    }


});