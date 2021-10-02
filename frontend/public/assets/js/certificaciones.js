window.onload = (event) => {
    filtrosTabla();
  };

function filtrosTabla() {
    var buscarCuiEstudiante = document.getElementById('buscarCuiEstudiante');
    var buscarNombreEstudiante = document.getElementById('buscarNombreEstudiante');
    var buscarApellidoEstudiante = document.getElementById('buscarApellidoEstudiante');
    var buscarEstado = document.getElementById('buscarEstado');
    var table = document.getElementById("certificadosTable");
    
    if(table){
        var tableBody = table.tBodies[0];
        buscaTabla = function(){   
            tbuscarCuiEstudiante = buscarCuiEstudiante.value.toLowerCase();
            tbuscarNombreEstudiante = buscarNombreEstudiante.value.toLowerCase();
            tbuscarApellidoEstudiante = buscarApellidoEstudiante.value.toLowerCase();
            tbuscarEstado = buscarEstado.value.toLowerCase();
            
            var r=0;
            while(row = tableBody.rows[r++])
            {
                if ((row.cells[0].innerHTML.toLowerCase().indexOf(tbuscarCuiEstudiante) !== -1 || tbuscarCuiEstudiante=='') 
                    && (row.cells[1].innerHTML.toLowerCase().indexOf(tbuscarNombreEstudiante) !== -1 || tbuscarNombreEstudiante=='')
                    && (row.cells[2].innerHTML.toLowerCase().indexOf(tbuscarApellidoEstudiante) !== -1 || tbuscarApellidoEstudiante=='')
                    && (row.cells[3].innerHTML.toLowerCase().indexOf(tbuscarCorreo) !== -1 || tbuscarCorreo=='')
                    && (row.cells[4].innerHTML.toLowerCase().indexOf(tbuscarEstado) !== -1 || tbuscarEstado==''))
                    row.style.display = null;
                else
                    row.style.display = 'none';
            }
        }
    
        buscarCuiEstudiante.addEventListener('keyup', buscaTabla);
        buscarNombreEstudiante.addEventListener('keyup', buscaTabla);
        buscarApellidoEstudiante.addEventListener('keyup', buscaTabla);
        buscarEstado.addEventListener('keyup', buscaTabla);
    }
    
}

function Emitir(){
    mostrarPantallaCarga();
    let jsobject = [];
    $('.emitir:checked').each(function (i, item) {
        jsobject.push(item.value);
    });
    
    let form_data = {};
    form_data['cursos'] = jsobject;
    form_data['observacion'] = 'observacion';
    form_data['observacion_correo'] = 'observacion correo';
    form_data['observacion_diploma'] = 'observacion diploma';
    $.ajax({
        url: "/emitirCertificados",
        cache: false,
        method: "POST",
        data: form_data,
        dataType: "json"
    }).done(function (data){
        cerrarPantallaCarga();
        if(data.estado) {
            createModal('Proceso de emisión inciado', 'Se inicio un proceso de emisión de certificados, al finalizar se le enviará un correo electrónico de confirmación.', 'alert','');
            ocultarComponentes('Emitidos','Pendientes');
            cargarCursos();
        }
        else { 
            createModal('Error al iniciar proceso', 'Ha sucedido un error al iniciar el proceso de emisión de certificados, intente nuevamente.', 'alert');
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        cerrarPantallaCarga();
        createModal('Error al iniciar proceso', 'Ha sucedido un error al iniciar el proceso de emisión de certificados, intente nuevamente.', 'alert');
    });
    
}

function cargarPeriodos(){
    mostrarPantallaCarga();
    limpiarTabla('cursosPendientes');
    limpiarTabla('cursosEmitidos');
    limpiarContadores();
    $('#periodoSelect').hide();
    $('#periodoLabel').hide();
    var anio = document.getElementById('anioSelect').value;
    let form_data = {};
    form_data['anio'] = anio;
    $.ajax({
        url: "/listarPeriodosDisponibles",
        cache: false,
        method: "POST",
        data: form_data,
        dataType: "json"
    }).done(function (data){
        agregarOpciones('periodoSelect',data);
        cerrarPantallaCarga()
    }).fail(function (jqXHR, textStatus, errorThrown) {
        createModal('Error', 'Ha sucedido un error al cargar las secciones intente nuevamente.', 'alert');
    });
    
}

function cargarCursos(){
    mostrarPantallaCarga();
    limpiarTabla('cursosPendientes');
    limpiarTabla('cursosEmitidos');
    limpiarContadores();
    var anio = document.getElementById('anioSelect').value;
    var periodo = document.getElementById('periodoSelect').value;
    let form_data = {};
    form_data['anio'] = anio;
    form_data['periodo'] = periodo;
    $.ajax({
        url: "/listaCursosDisponibles",
        cache: false,
        method: "POST",
        data: form_data,
        dataType: "json"
    }).done(function (data){
        //$("#noCursos").text(data.length);
        agregarCursos('cursosPendientes','cursosEmitidos',data);
        
        var busquedaCodigoCurso = document.getElementById('buscarCodigoCurso');
        var busquedaCurso = document.getElementById('buscarCurso');
        var busquedaSeccion = document.getElementById('buscarSeccion');
        busquedaCodigoCurso.value='';
        busquedaCurso.value='';
        busquedaSeccion.value='';
        
        var table = document.getElementById("cursosPendientes").tBodies[0];

        buscaTabla = function(){
            textoBusquedaCodigoCurso = busquedaCodigoCurso.value.toLowerCase();
            textoBusquedaCurso = busquedaCurso.value.toLowerCase();
            textoBusquedaSeccion = busquedaSeccion.value.toLowerCase();
            
            var r=0;
            while(row = table.rows[r++])
            {
                if ((row.cells[1].innerHTML.toLowerCase().indexOf(textoBusquedaCodigoCurso) !== -1 || textoBusquedaCodigoCurso=='') 
                    && (row.cells[2].innerHTML.toLowerCase().indexOf(textoBusquedaCurso) !== -1 || textoBusquedaCurso=='')
                    && (row.cells[3].innerHTML.toLowerCase().indexOf(textoBusquedaSeccion) !== -1 || textoBusquedaSeccion==''))
                    row.style.display = null;
                else
                    row.style.display = 'none';
            }
        }

        busquedaCodigoCurso.addEventListener('keyup', buscaTabla);
        busquedaCurso.addEventListener('keyup', buscaTabla);
        busquedaSeccion.addEventListener('keyup', buscaTabla);
        

        var busquedaCodigoCursoE = document.getElementById('buscarCodigoCursoE');
        var busquedaCursoE = document.getElementById('buscarCursoE');
        var busquedaSeccionE = document.getElementById('buscarSeccionE');
        busquedaCodigoCursoE.value='';
        busquedaCursoE.value='';
        busquedaSeccionE.value='';
        
        var tableE = document.getElementById("cursosEmitidos").tBodies[0];

        buscaTablaE = function(){
            textoBusquedaCodigoCursoE = busquedaCodigoCursoE.value.toLowerCase();
            textoBusquedaCursoE = busquedaCursoE.value.toLowerCase();
            textoBusquedaSeccionE = busquedaSeccionE.value.toLowerCase();
            
            var rE=0;
            while(rowE = tableE.rows[rE++])
            {
                if ((rowE.cells[1].innerHTML.toLowerCase().indexOf(textoBusquedaCodigoCursoE) !== -1 || textoBusquedaCodigoCursoE=='') 
                    && (rowE.cells[2].innerHTML.toLowerCase().indexOf(textoBusquedaCursoE) !== -1 || textoBusquedaCursoE=='')
                    && (rowE.cells[3].innerHTML.toLowerCase().indexOf(textoBusquedaSeccionE) !== -1 || textoBusquedaSeccionE==''))
                    rowE.style.display = null;
                else
                    rowE.style.display = 'none';
            }
        }

        busquedaCodigoCursoE.addEventListener('keyup', buscaTablaE);
        busquedaCursoE.addEventListener('keyup', buscaTablaE);
        busquedaSeccionE.addEventListener('keyup', buscaTablaE);

        cerrarPantallaCarga()
    }).fail(function (jqXHR, textStatus, errorThrown) {
        createModal('Error', 'Ha sucedido un error al cargar las secciones intente nuevamente.', 'alert');
    });
    
}

function cargarCursosEstudiante(){
    mostrarPantallaCarga();
    limpiarTabla('cursosPendientesEstudiante');
    limpiarTabla('cursosEmitidosEstudiante');
    limpiarContadores();
    var anio = document.getElementById('anioSelect').value;
    var periodo = document.getElementById('periodoSelect').value;
    let form_data = {};
    form_data['anio'] = anio;
    form_data['periodo'] = periodo;
    $.ajax({
        url: "/listaCursosDisponiblesEstudiante",
        cache: false,
        method: "POST",
        data: form_data,
        dataType: "json"
    }).done(function (data){
        //$("#noCursos").text(data.length);
        agregarCursosEstudiante('cursosPendientesEstudiante','cursosEmitidosEstudiante',data);
        
        var busquedaCodigoCurso = document.getElementById('buscarCodigoCurso');
        var busquedaCurso = document.getElementById('buscarCurso');
        var busquedaSeccion = document.getElementById('buscarSeccion');
        
        var table = document.getElementById("cursosPendientesEstudiante").tBodies[0];

        buscaTabla = function(){
            textoBusquedaCodigoCurso = busquedaCodigoCurso.value.toLowerCase();
            textoBusquedaCurso = busquedaCurso.value.toLowerCase();
            textoBusquedaSeccion = busquedaSeccion.value.toLowerCase();
            
            var r=0;
            while(row = table.rows[r++])
            {
                if ((row.cells[1].innerHTML.toLowerCase().indexOf(textoBusquedaCodigoCurso) !== -1 || textoBusquedaCodigoCurso=='') 
                    && (row.cells[2].innerHTML.toLowerCase().indexOf(textoBusquedaCurso) !== -1 || textoBusquedaCurso=='')
                    && (row.cells[3].innerHTML.toLowerCase().indexOf(textoBusquedaSeccion) !== -1 || textoBusquedaSeccion==''))
                    row.style.display = null;
                else
                    row.style.display = 'none';
            }
        }

        busquedaCodigoCurso.addEventListener('keyup', buscaTabla);
        busquedaCurso.addEventListener('keyup', buscaTabla);
        busquedaSeccion.addEventListener('keyup', buscaTabla);

        var busquedaCodigoCursoE = document.getElementById('buscarCodigoCursoE');
        var busquedaCursoE = document.getElementById('buscarCursoE');
        var busquedaSeccionE = document.getElementById('buscarSeccionE');
        
        var tableE = document.getElementById("cursosEmitidosEstudiante").tBodies[0];

        buscaTablaE = function(){
            textoBusquedaCodigoCursoE = busquedaCodigoCursoE.value.toLowerCase();
            textoBusquedaCursoE = busquedaCursoE.value.toLowerCase();
            textoBusquedaSeccionE = busquedaSeccionE.value.toLowerCase();
            
            var rE=0;
            while(rowE = tableE.rows[rE++])
            {
                if ((rowE.cells[1].innerHTML.toLowerCase().indexOf(textoBusquedaCodigoCursoE) !== -1 || textoBusquedaCodigoCursoE=='') 
                    && (rowE.cells[2].innerHTML.toLowerCase().indexOf(textoBusquedaCursoE) !== -1 || textoBusquedaCursoE=='')
                    && (rowE.cells[3].innerHTML.toLowerCase().indexOf(textoBusquedaSeccionE) !== -1 || textoBusquedaSeccionE==''))
                    rowE.style.display = null;
                else
                    rowE.style.display = 'none';
            }
        }

        busquedaCodigoCursoE.addEventListener('keyup', buscaTablaE);
        busquedaCursoE.addEventListener('keyup', buscaTablaE);
        busquedaSeccionE.addEventListener('keyup', buscaTablaE);

        cerrarPantallaCarga()
    }).fail(function (jqXHR, textStatus, errorThrown) {
        createModal('Error', 'Ha sucedido un error al cargar las secciones intente nuevamente.', 'alert');
    });
    
}

function ocultarComponentes(nombreComponenteOcultar,nombreComponenteMostrar){
    $('#cursos'+nombreComponenteMostrar).show();
    $('#cursos'+nombreComponenteOcultar).hide();
    document.getElementById("icono"+nombreComponenteOcultar).className = 'far fa-eye-slash';
    document.getElementById("icono"+nombreComponenteMostrar).className = 'fas fa-eye';
    document.getElementById("boton"+nombreComponenteOcultar).className = 'btn btn-secondary text-white';
    document.getElementById("boton"+nombreComponenteMostrar).className = 'btn btn-warning text-white';    
    document.getElementById("noCursos"+nombreComponenteOcultar).className = 'text-white mt-1';
    document.getElementById("noCursos"+nombreComponenteMostrar).className = 'text-dark mt-1';

    if(nombreComponenteOcultar==='Pendientes'){
        $('#boton_emitir').hide();
    }

    if(nombreComponenteMostrar==='Pendientes'){
        $('#boton_emitir').show();
    }
}

function agregarCursos(nombreTablaPendientes,nombreTablaEmitidos,datos){
    $('#'+nombreTablaPendientes).hide();
    var tblBody = document.createElement("tbody");
    var tblBody2 = document.createElement("tbody");
    document.getElementById(nombreTablaPendientes).appendChild(tblBody);
    document.getElementById(nombreTablaEmitidos).appendChild(tblBody2);
    var nombreTabla = nombreTablaPendientes;
    var emitidos=0;
    var pendientes=0;
    $.each(datos, function(index, datosFila) {
        fila = '<tr class="" role="row">'

        if(!datosFila.estado){
            fila += '<td tabindex="0" align="center"> '
                        + '<input type="checkbox" class="emitir" value="'+datosFila.anio+'_'+datosFila.periodo+'_'+datosFila.unidad+'_'+datosFila.curso+'_'+datosFila.seccion+'">'
                        + '</td>';
        }else{
            fila += '<td tabindex="0" align="center"> </td>';
        }

        fila += '<td align="center"> '+datosFila.curso+' </td>'
                    + '<td>'+datosFila.nombreCurso+'</td>'
                    + '<td align="center">'+datosFila.seccion+'</td>'
                    + '<td align="left">'+datosFila.nocertificados+'</td>'
                    + '<td align="center">'
                    + '<div class="container" style="min-width: 75px;">'
                    + '<div class="row">'
        if(datosFila.estado){
            nombreTabla = nombreTablaEmitidos;
            emitidos++;
            fila += '<div class="col-sm">'
                    + '<a  class="btn btn-info text-white" role="button" id="'+datosFila.anio+'_'+datosFila.periodo+'_'+datosFila.curso+'_'+datosFila.seccion
                    +'"onclick="listarCertificacionesCursoSeccion(\''+datosFila.anio+'\',\''+datosFila.periodo+'\',\''+datosFila.curso+'\',\''+datosFila.seccion
                    +'\')" title="Consultar Certificados">'
                    + '<i class="far fa-eye"></i>'
                    + '</a>'
                    + '</div>';
        }else{
            nombreTabla = nombreTablaPendientes;
            pendientes++;
            fila += '<div class="col-sm">'
                    +'<button type="button" class="btn btn-secondary" title="Pendiente de emisión" disabled>'
                    +'<i class="fas fa-eye-slash"> </i>'
                    +'</button>'
                    + '</div>';
        }                    
        fila += '</div>'
                +'</div>'
                +'</td>'
                +'</tr>';
        
        $('#'+nombreTabla+' tbody').append(fila);
    });
    $("#noCursosEmitidos").text(emitidos);
    $("#noCursosPendientes").text(pendientes);
    $('#'+nombreTablaPendientes).show();            
}

function agregarCursosEstudiante(nombreTablaPendientes,nombreTablaEmitidos,datos){
    $('#'+nombreTablaPendientes).hide();
    var tblBody = document.createElement("tbody");
    var tblBody2 = document.createElement("tbody");
    document.getElementById(nombreTablaPendientes).appendChild(tblBody);
    document.getElementById(nombreTablaEmitidos).appendChild(tblBody2);
    var nombreTabla = nombreTablaPendientes;
    var emitidos=0;
    var pendientes=0;
    $.each(datos, function(index, datosFila) {
        fila = '<tr class="" role="row">'

        if(!datosFila.estado){
            fila += '<td tabindex="0" align="center"> '
                        + '<input type="checkbox" class="emitir" value="'+datosFila.anio+'_'+datosFila.periodo+'_'+datosFila.unidad+'_'+datosFila.curso+'_'+datosFila.seccion+'">'
                        + '</td>';
        }else{
            fila += '<td tabindex="0" align="center"> </td>';
        }

        fila += '<td align="center"> '+datosFila.curso+' </td>'
                    + '<td>'+datosFila.nombreCurso+'</td>'
                    + '<td align="center">'+datosFila.seccion+'</td>'
                    + '<td align="center">'+datosFila.estado_descripcion+'</td>'
                    + '<td align="center">'
                    + '<div class="container" style="min-width: 75px;">'
                    + '<div class="row">'
        if(datosFila.estado){
            nombreTabla = nombreTablaEmitidos;
            emitidos++;
            fila += '<a  class="btn btn-info text-white" role="button" '
                    +   'onclick="mostrarDetallesCertificadoEstudiante(\''+datosFila.anio+'\',\''+datosFila.periodo+'\',\''+datosFila.unidad+'\',\''+datosFila.curso+'\',\''+datosFila.seccion+'\',\''+datosFila.cui+'\')"'
                    +   'title="Ver detalles Certificado">'
                    +    '<i class="far fa-eye"></i>'
                    +'</a>';
        }else{
            nombreTabla = nombreTablaPendientes;
            pendientes++;
            fila += '<div class="col-sm">'
                    +'<button type="button" class="btn btn-secondary" title="Pendiente de emisión" disabled>'
                    +'<i class="fas fa-eye-slash"> </i>'
                    +'</button>'
                    + '</div>';
        }                    
        fila += '</div>'
                +'</div>'
                +'</td>'
                +'</tr>';
        
        $('#'+nombreTabla+' tbody').append(fila);
    });
    $("#noCursosEmitidosEstudiante").text(emitidos);
    $("#noCursosPendientesEstudiante").text(pendientes);
    $('#'+nombreTablaPendientes).show();            
}

function agregarOpciones(nombreSelect,opciones){
    limpiarSelect(nombreSelect)
    var select = document.getElementById(nombreSelect);
    $.each(opciones, function(index, valor) {
        var option = document.createElement('option');
        option.appendChild( document.createTextNode(valor.periodo) );
        option.value = valor.periodo; 
        select.appendChild(option); 
    });
    $('#periodoLabel').show();
    $('#periodoSelect').show();
}

function limpiarSelect(nombreSelect){
    var select = document.getElementById(nombreSelect);
    for (let i = select.options.length; i >= 0; i--) {
        select.remove(i);
    }

    var option = document.createElement('option');
    option.appendChild(document.createTextNode('Seleccione Periodo...') );
    option.value = 0; 
    select.appendChild(option);
};

function limpiarTabla(nombreTabla){
    $("#"+nombreTabla+" tbody").remove(); 
}

function limpiarContadores(){
    $("#noCursosEmitidos").text('-');
    $("#noCursosPendientes").text('-');
}


function createModal(head, body, type, funcion_ejecutar) {
    if( type == 'alert') {
        $('#modal-dialog').removeClass('modal-lg').addClass('modal-sm');
        $('#modal-head').html('<h4 class="modal-title">'+head+'</h4>');
        $('#modal-body').html('<p>' + body + '</p>');
        $('#modal-footer').html('<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>');
        $('#custom-modal').modal('show');
    } else if( type == 'confirm') {
        $('#modal-dialog').removeClass('modal-sm').addClass('modal-lg');
        $('#modal-head').html('<h4 class="modal-title">'+ head +'</h4>');
        $('#modal-body').html('<p>' + body + '</p>');
        $('#modal-footer').html('<button type="button" class="btn btn-primary" id="ok-btn" onclick="'+funcion_ejecutar+'">Aceptar</button>');
        $('#custom-modal').modal('show');
    } else if (type == 'data') {
        $('#modal-dialog').removeClass('modal-sm').addClass('modal-lg');
        $('#modal-head').html('<h4 class="modal-title">'+head+'</h4>');
        $('#modal-body').html(body);
        $('#modal-footer').html('<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>');
        $('#custom-modal').modal('show');
    }
}

const reloadPage = (path) => {
    window.location.href = `${path}`;
}

function submit(){
    window.location.replace("/listaCursosCertificacion");
}

function listarCertificacionesCursoSeccion(anio,periodo,curso,seccion){
        window.location="/listarCertificacionesCursoSeccion/"+anio+"/"+periodo+"/"+curso+"/"+seccion;
}

function mostrarDetallesCertificado(anio,periodo,unidad,curso,seccion,cui){
    mostrarPantallaCarga();
    let form_data = {};
    form_data['anio'] = anio;
    form_data['periodo'] = periodo;
    form_data['curso'] = curso;
    form_data['seccion'] = seccion;
    form_data['cui'] = cui;

    $.ajax({
        url: "/detallesCertificado",
        cache: false,
        method: "POST",
        data: form_data,
        dataType: "json"
    }).done(function (data){
        var detalle = document.getElementById('detalleCertificado');
        var listadoCompleto = document.getElementById('listadoCertificados');
        if (data){
            var datos = data[0];
            if (detalle){
                if (listadoCompleto){  
                    $('#listadoCertificados').hide(); 
                    document.getElementById('curso').innerHTML = datos.nombreactividad;
                    document.getElementById('seccion').innerHTML = datos.seccion;
                    document.getElementById('cui').innerHTML = datos.cui;
                    document.getElementById('nombreCompleto').innerHTML  = datos.nombre+" "+ datos.apellido;
                    document.getElementById('correo').innerHTML  = datos.correo;
                    document.getElementById('estado').innerHTML  = datos.estado_certificado;
                    document.getElementById('certificado').innerHTML  = datos.idcertificado;
                    document.getElementById('solicitud').innerHTML  = datos.idsolicitud;
                    document.getElementById('correoNuevo').value  = datos.correo;
                    document.getElementById('fechasolicitud').innerHTML = formatoFecha(datos.fechasolicitud.date);
                    var help = $('#estado_descripcion');
                    help.attr('data-content', datos.estado_descripcion).popover({trigger: 'hover', html: true});

                    enviarCertificado = function(){
                        mostrarPantallaCarga();
                        let form_data = {};
                        form_data['anio'] = anio;
                        form_data['periodo'] = periodo;
                        form_data['unidad'] = unidad;
                        form_data['curso'] = curso;
                        form_data['seccion'] = seccion;
                        form_data['cui'] = cui;
                        form_data['correo'] = document.getElementById('correoNuevo').value;
                        $.ajax({
                            url: "/enviarCertificado",
                            cache: false,
                            method: "POST",
                            data: form_data,
                            dataType: "json"
                        }).done(function (data){
                            cerrarPantallaCarga();
                            if(data.estado){
                                createModal('Confirmación', data.respuesta[0].resultado_reenvio[0].detalle.mensaje, 'alert');
                            }else{
                                createModal('Confirmación', "Ha sucedido un error en la comunicación con el servicio, intente nuevamente mas tarde. ", 'alert');

                            }
                            mostrarDetallesCertificado(anio,periodo,unidad,curso,seccion,cui);
                        }).fail(function (jqXHR, textStatus, errorThrown) {
                            createModal('Error', 'Ha sucedido un error al cargar el detalle del certificado intente nuevamente.', 'alert');
                        });
                    }

                    document.getElementById('enviarCertificado').addEventListener('click', enviarCertificado);  
                    if(datos.idestado==2 || datos.idestado==3 || datos.idestado==4 || datos.idestado==5){
                        $('#panelReenvio').show();
                    }else{
                        $('#panelReenvio').hide();
                    }
                    $('#detalleCertificado').show(); 
                }
            }
        }
        cerrarPantallaCarga();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        createModal('Error', 'Ha sucedido un error al cargar el detalle del certificado intente nuevamente.', 'alert');
    });   

}

function mostrarDetallesCertificadoEstudiante(anio,periodo,unidad,curso,seccion,cui){
    mostrarPantallaCarga();
    let form_data = {};
    form_data['anio'] = anio;
    form_data['periodo'] = periodo;
    form_data['curso'] = curso;
    form_data['seccion'] = seccion;
    form_data['cui'] = cui;

    $.ajax({
        url: "/detallesCertificado",
        cache: false,
        method: "POST",
        data: form_data,
        dataType: "json"
    }).done(function (data){
        var detalle = document.getElementById('detalleCertificadoEstudiante');
        if (data){
            var datos = data[0];
            if (detalle){
                $('#cursosEmitidosEstudiante').hide();  
                $('#cursosPendientesEstudiante').hide();  
                document.getElementById('curso').innerHTML = datos.nombreactividad;
                document.getElementById('seccion').innerHTML = datos.seccion;
                document.getElementById('cui').innerHTML = datos.cui;
                document.getElementById('nombreCompleto').innerHTML  = datos.nombre+" "+ datos.apellido;
                document.getElementById('correo').innerHTML  = datos.correo;
                document.getElementById('estado').innerHTML  = datos.estado_certificado;
                document.getElementById('certificado').innerHTML  = datos.idcertificado;
                document.getElementById('solicitud').innerHTML  = datos.idsolicitud;
                document.getElementById('correoNuevo').value  = datos.correo;
                document.getElementById('fechasolicitud').innerHTML = formatoFecha(datos.fechasolicitud.date);;
                var help = $('#estado_descripcion');
                help.attr('data-content', datos.estado_descripcion).popover({trigger: 'hover', html: true});

                enviarCertificado = function(){
                    mostrarPantallaCarga();
                    let form_data = {};
                    form_data['anio'] = anio;
                    form_data['periodo'] = periodo;
                    form_data['unidad'] = unidad;
                    form_data['curso'] = curso;
                    form_data['seccion'] = seccion;
                    form_data['cui'] = cui;
                    form_data['correo'] = document.getElementById('correoNuevo').value;
                    $.ajax({
                        url: "/enviarCertificado",
                        cache: false,
                        method: "POST",
                        data: form_data,
                        dataType: "json"
                    }).done(function (data){
                        cerrarPantallaCarga();
                        createModal('Confirmación', 'Envio de certificado realizado con exito.', 'alert');
                        mostrarDetallesCertificado(anio,periodo,unidad,curso,seccion,cui);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        createModal('Error', 'Ha sucedido un error al cargar el detalle del certificado intente nuevamente.', 'alert');
                    });
                }

                document.getElementById('enviarCertificado').addEventListener('click', enviarCertificado);  
                if(datos.idestado==2 || datos.idestado==3 || datos.idestado==4 || datos.idestado==5){
                    $('#panelReenvio').show();
                }else{
                    $('#panelReenvio').hide();
                }
                $('#detalleCertificadoEstudiante').show(); 
                
            }
        }
        cerrarPantallaCarga();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        createModal('Error', 'Ha sucedido un error al cargar el detalle del certificado intente nuevamente.', 'alert');
    });   

}

function cambiarAccionForm(url){
    document.formReportes.action = url;
}

function formatoFecha(fecha){
    diaActual = new Date(fecha);
    var dia = diaActual.getDate().toString();
    var mes = (diaActual.getMonth()+1).toString();
    var mesconcero = mes.length==1?('0'+mes):mes;
    var diaconcero = dia.length==1?('0'+dia):dia;
    var anio = diaActual.getFullYear();
    fechaformato  = diaconcero + '-' + mesconcero + '-' + anio;
    return fechaformato;
}