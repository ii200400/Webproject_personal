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
  var search_sql = 'SELECT * FROM notice_table';
  connection.query(search_sql, function(err, rows, fields) {
    if (!err){
      res.render('consulting', {rows:rows});
    }else{
      console.log('Error while performing Query.', err);
    }
  });
});
router.get('/consulting/:id', function(req, res, next) {
  var search_sql = 'SELECT * FROM notice_table';
  var number = req.params.id;
  connection.query(search_sql, function(err, rows, fields) {
    if (!err){
      res.render('consult_detail', {data:rows[number]});
    }else{
      console.log('Error while performing Query.', err);
    }
  });
});
router.post('/consulting', function(req, res, next) {
  var update_sql = 'UPDATE notice_table SET name=?, title=? WHERE id=?'
  var params = [req.params.id]
  connection.query(search_sql, params, function(err, rows, fields) {
    if (!err){
      res.send(rows[0]);
      res.render('consult_detail', {data:rows[0]});
    }else{
      console.log('Error while performing Query.', err);
    }
  });
});
//
// var update_params = ['영선','업데이트!',1];
// connection.query(update_sql, update_params, function(err, rows, fields) {
//   if (!err){
//     console.log('The solution is: ', rows);
//     for (var i = 0; i < rows.length; i++) {
//       console.log(rows[i].title);
//     }
//   }else{
//     console.log('Error while performing Query.', err);
//   }
// });

module.exports = router;
