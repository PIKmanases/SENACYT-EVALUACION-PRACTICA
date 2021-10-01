const mysql = require('../config/connection');
const {Querys} = require('../models/querys');

const query = new Querys();

exports.Login = (req, res) => {
    try {
        res.status(200).json({msj:"Todo ok"});
    } catch (error) {
        res.status(500).json({msj: "a ocurrido un error"});
    }
}
