const { Router } = require('express');

const app = Router();

//Rutas para el usuario
const user = require('../controllers/users');

app.post('/login', user.Login);
app.put('/user/update', user.Actualizar);






module.exports = app;
//docker run --name mysql-main -e MYSQL_ROOT_PASSWORD=password -d mysql:latest
//docker exec -it mysql-main bash 