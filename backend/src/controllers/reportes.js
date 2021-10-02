const mysql = require('../config/connection');
const { Querys } = require("../models/querys");

const query = new Querys();

exports.Personas = (req, res)=>{
    try {
        mysql.query(query.reporte_personas(), (err, result)=>{
            if(err) throw err;
            res.status(200).json(result);
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({msj: "Error en el servidor"});
    }
}

exports.AreasDesempeño = (req, res)=>{
    try {
        mysql.query(query.reporte_areas(), (err, result)=>{
            if(err) throw err;
            res.status(200).json(result);
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({msj: "Error en el servidor"});       
    }
}