const { Router } = require('express');

const app = Router();

const user = require('../controllers/users');
//
app.get('/hola', user.Login);


module.exports = app;
//docker run --name mysql-main -e MYSQL_ROOT_PASSWORD=password -d mysql:latest
//docker exec -it mysql-main bash 