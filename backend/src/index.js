const exrpess = require('express');
const cors = require('cors');

const app = exrpess();

const PORT = 5000;

//configuración
app.use(exrpess.urlencoded({extended: false}));
app.use(exrpess.json());
app.use(cors());

//Rutas
app.use(require('./routes/routes'));


app.listen(PORT, ()=>{
    console.log(`Backen is listening on http://localhost:${PORT}`);
});