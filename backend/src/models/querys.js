class Querys{
    constructor(){}

    login(user, password){
        return `SELECT * FROM persona p 
        WHERE p.usuario = '${user}' AND p.contrasenia = '${password}';`;
    }

    actulizar_datos(persona){
        return `UPDATE persona 
        SET primer_nombre = '${persona.primer_nombre}', segundo_nombre = '${persona.segundo_nombre}', tercer_nombre='${persona.tercer_nombre}', 
        primer_apellido = '${persona.primer_apellido}', segundo_apellido = '${persona.segundo_apellido}', telefono = ${persona.telefono}, 
        fecha_nacimiento = '${persona.fecha_nacimiento}', direccion = '${persona.direccion}', genero = '${persona.genero}', 
        contrasenia = '${persona.contrasenia}'
        WHERE usuarios_id = ${persona.usuarios_id};`;    
    }

    actualizar_logro(logro){
        return `UPDATE logro_academico 
        SET anio = ${logro.anio}, titulo = '${logro.titulo}', tipo_logro_tipo_logro_id = ${logro.tipo_id}, 
        institucion_institucion_id = ${logro.institucion}
        WHERE logro_id = ${logro.logro_id};`
    }

    actulizar_area(area, persona){
        return `UPDATE area_desempenio 
        SET areas_estudio_area_estudio_id = ${area}
        WHERE persona_usuarios_id = ${persona};`;
    }

    agregar_desempeño(area, persona){
        return `INSERT INTO area_desempenio (areas_estudio_area_estudio_id, persona_usuarios_id)
        VALUES (${area}, ${persona});`;        
    }

    agregar_logro(logro){
        return `INSERT INTO logro_academico (anio, titulo, tipo_logro_tipo_logro_id, persona_usuarios_id, institucion_institucion_id)
        values (${logro.anio}, '${logro.titulo}', ${logro.tipo_logro}, ${logro.persona}, ${logro.institucion});`;
    }

    quitar_desempeño(area, persona){
        return `DELETE FROM area_desempenio a
        WHERE a.areas_estudio_area_estudio_id = ${area} and a.persona_usuarios_id = ${persona};`;
    }

    quitar_logro(logro_id){
        return `DELETE FROM logro_academico l
        WHERE l.logro_id = ${logro_id};`;
    }

    reporte_personas(){
        return `SELECT usuarios_id, CONCAT_WS(' ', p2.primer_nombre, p2.primer_apellido) as nombre,
        p2.genero,
        (SELECT CONCAT_WS(' ', la.anio, i.nombre, tl.descripcion, la.titulo) FROM persona p 
        INNER JOIN logro_academico la ON p.usuarios_id = la.persona_usuarios_id 
        INNER JOIN tipo_logro tl ON tl.tipo_logro_id = la.tipo_logro_tipo_logro_id 
        INNER JOIN institucion i ON i.institucion_id = la.institucion_institucion_id 
        WHERE p.usuarios_id = p2.usuarios_id 
        ORDER BY la.anio DESC 
        LIMIT 1) as Titulo
        FROM persona p2 ;`;
    }

    reporte_areas(){
        return `SELECT ae.nombre, COUNT(*) as cantidad FROM areas_estudio ae 
        INNER JOIN area_desempenio ad ON ae.area_estudio_id = ad.areas_estudio_area_estudio_id 
        INNER JOIN persona p ON p.usuarios_id = ad.persona_usuarios_id 
        GROUP BY ae.nombre ;`;
    }
}

module.exports = {Querys};