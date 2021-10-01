const mysql =  require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'SENACYT',
    multipleStatements: 'true',
});

connection.connect( (error) => {
    if(!!error) console.log(error);
    else console.log('Conection to the database is succesful');
});

module.exports = connection;