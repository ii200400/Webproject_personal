module.exports = function(){
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'dudtjs972972',
    database : 'pilates'
  });
  connection.connect();
  return connection;
}
