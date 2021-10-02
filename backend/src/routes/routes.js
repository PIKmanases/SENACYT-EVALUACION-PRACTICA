const { Router } = require('express');

const app = Router();

//Rutas para el usuario
const user = require('../controllers/users');

app.post('/login', user.Login);
app.put('/upadate/user', user.Actualizar);
app.put('/update/logro', user.ActualizarLogro);
app.put('/update/area', user.ActualizarArea);
app.post('/add-area-desempenio', user.AgregarDesempeño);
app.post('/add-logro', user.AgregarLogro);
app.delete('/delete/desempenio/:area/:persona', user.QuitarDesempeño);
app.delete('/delete/logro/:logro_id', user.QuitarLogro);


//Rutas para obtener los reportes
const reporte = require('../controllers/reportes');

app.get('/reporte/personas', reporte.Personas);
app.get('/reporte/areas-desempenio', reporte.AreasDesempeño);



module.exports = app;
//docker run --name mysql-main -e MYSQL_ROOT_PASSWORD=password -d mysql:latest
//docker exec -it mysql-main bash 