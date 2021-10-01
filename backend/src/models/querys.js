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
}

module.exports = {Querys};