const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'qa'
})

connection.connect();

module.exports = connection;
