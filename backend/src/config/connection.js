const mysql =  require('mysql');

const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: '',
    multipleStatements: 'true',
});

connection.connect( (error) => {
    if(!!error) console.log(error);
    else console.log('Conection to the database is succesful');
})