const mysql = require('../config/connection');
const {Querys} = require('../models/querys');

const query = new Querys();

exports.Login = (req, res) => {
    try {
        console.log("Realizando login");
        mysql.query(query.login(req.body.user, req.body.contrasenia), (err, result)=>{
            console.log(result);
            if(err) throw err;
            res.status(200).json(result);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msj: "a ocurrido un error"});
    }
}

exports.Actualizar = (req, res) => {
    try {
        mysql.query(query.actulizar_datos(req.body), (err, result)=>{
            if(err) throw err;
            res.status(200).json({msj:"Usuario actualizado"});
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msj: "a ocurrido un error"});
    }
}

exports.ActualizarLogro = (req, res) => {
    try {
        mysql.query(query.actualizar_logro(req.body), (err, result)=>{
            if(err) throw err;
            res.status(200).json({msj:"Logro actualizado"});
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msj: "a ocurrido un error"});
    }
}

exports.ActualizarArea = (req, res)=>{
    try {
        mysql.query(query.actulizar_area(req.body.area, req.body.persona), (err, result)=>{
            if(err) throw err;
            res.status(200).json({msj:"Area actualizado"});
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msj: "a ocurrido un error"});
    }
}

exports.AgregarDesempeño = (req, res) => {
    try {
        mysql.query(query.agregar_desempeño(req.body.area, req.body.persona), (err, result)=>{
            if(err) throw err;
            res.status(200).json({msj:"Area agregada al usuario"});
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msj: "a ocurrido un error", e:error});
    }
}

exports.AgregarLogro = (req, res)=>{
    try {
        mysql.query(query.agregar_logro(req.body), (err, result)=>{
            if(err) throw err;
            res.status(200).json({msj:"Logro agregado al usuario"});
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msj: "a ocurrido un error", e:error});
    }
}

exports.QuitarDesempeño = (req, res)=>{
    try {
        mysql.query(query.quitar_desempeño(req.params.area, req.params.persona), (err, result)=>{
            if(err) throw err;
            res.status(200).json({msj:"Desempeño quitado al usuario"});
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msj: "a ocurrido un error", e:error});
    }
}

exports.QuitarLogro = (req, res)=>{
    try {
        mysql.query(query.quitar_logro(req.params.logro_id), (err, result)=>{
            if(err) throw err;
            res.status(200).json({msj:"Logro quitado al usuario"});
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msj: "a ocurrido un error", e:error});
    }
}

exports.Register = (req, res) => {
    try {
        console.log(req.body);
        res.status(200).json({msj:"Registered user successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msj: "An internal error has ocurred"});
    }
}
