const mysql = require('../config/connection');
const {Querys} = require('../models/querys');

const query = new Querys();

exports.Login = (req, res) => {
    try {
        mysql.query(query.login(req.body.user, req.body.contrasenia), (err, result)=>{
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

exports.Register = (req, res) => {
    try {
        console.log(req.body);
        res.status(200).json({msj:"Registered user successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msj: "An internal error has ocurred"});
    }
}
