var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'dudtjs972972',
  database : 'pilates'
});
connection.connect();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('basic');
});
router.get('/consulting', function(req, res, next) {
  var search_sql = 'SELECT * FROM notice_table'
  connection.query(search_sql, function(err, rows, fields) {
    if (!err){
      res.render('consulting', {rows:rows})
    }else{
      console.log('Error while performing Query.', err);
    }
  });
});
router.get('/consult_detail', function(req, res, next) {
  res.render('consult_detail');
});

module.exports = router;
