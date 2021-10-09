const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',//Alojamiento de nuestra DB,esta localmente en este caso
    user: 'root',//usuario por defecto
    password: 'Password',
    database: 'company',//nombre de la base de datos
    multipleStatements: true
  });
  mysqlConnection.connect(function (err) {//si tiene un error para conectarse
    if (err) {
      console.error(err);
      return;
    } else {
      console.log('DB is connected');
    }
  });
  
  module.exports = mysqlConnection;//exportar modulo, para utilizarlo en otras partes de nuestra
                                  //aplicacion 