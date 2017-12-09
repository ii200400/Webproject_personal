var express = require('express');

var mysql = require('mysql');
var dateFormat = require('dateformat');

//수정 필요
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'dudtjs972972',
  database : 'pilates'
});

var now = new Date();
var time = dateFormat(now, "yyyy-mm-dd hh:MM:ss");
console.log(time);
// var insert_sql = 'INSERT INTO notice_table (name,title,description,created) VALUES(?,?,?,?)'
// var insert_params = ['뇌지','재목제목','글을 씁니다.',time]
// connection.query(insert_sql, params, function(err, rows, fields) {
//   if (!err){
//     console.log('The solution is: ', rows);
//     for (var i = 0; i < rows.length; i++) {
//       console.log(rows[i].title);
//     }
//     //rows.insertId 고유 id값을 가져올 수 있다고 한다.
//   }else{
//     console.log('Error while performing Query.', err);
//   }
// });

// var update_sql = 'UPDATE notice_table SET name=?, title=? WHERE id=?'
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

// var delete_sql = 'DELETE FROM notice_table WHERE id=?'
// var delete_params = [2];
// connection.query(delete_sql, delete_params, function(err, rows, fields) {
//   if (!err){
//     console.log('The solution is: ', rows);
//     for (var i = 0; i < rows.length; i++) {
//       console.log(rows[i].title);
//     }
//   }else{
//     console.log('Error while performing Query.', err);
//   }
// });

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/work', function(req, res, next) {
  res.render('work');
});
router.get('/work2', function(req, res, next) {
  connection.connect();
  var search_sql = 'SELECT * FROM notice_table'
  connection.query(search_sql, function(err, rows, fields) {
    if (!err){
      res.render('work2', {rows:rows})
    }else{
      console.log('Error while performing Query.', err);
    }
  });
  connection.end();
});
router.get('/services', function(req, res, next) {
  res.render('services');
});
router.get('/about', function(req, res, next) {
  res.render('about');
});
router.get('/about2', function(req, res, next) {
  res.render('about2');
});
router.get('/contact', function(req, res, next) {
  res.render('contact');
});

module.exports = router;
