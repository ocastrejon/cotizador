const mysql = require('mysql');

let db = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : 'Oscarlalo66-',
    database    : 'cotizador',
    dateStrings : true
});

db.connect((err)=>{
    if(err){
        console.log('Hubo error en la conexíon.');
        throw err;  
    } else {
        console.log('Está conectado!')
    }
})

module.exports = db;