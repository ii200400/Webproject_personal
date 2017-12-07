var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser'); //cookie
var bodyParser = require('body-parser'); //post

//이 아래는 내가 개인적으로 추가한 것
var mysql = require('mysql');
var dateFormat = require('dateformat');

var index = require('./routes/index');
var admin = require('./routes/admin');

var app = express();
//수정 필요
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'dudtjs972972',
  database : 'pilates'
});

connection.connect();

var now = new Date();
var time = dateFormat(now, "yyyy-mm-dd hh:MM:ss");
console.log(time);
// var insert_sql = 'INSERT INTO notice_table (name,title,description,created) VALUES(?,?,?,?)'
// var params = ['뇌지','재목제목','글을 씁니다.',time]
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

var search_sql = 'SELECT * FROM notice_table'
connection.query(search_sql, function(err, rows, fields) {
  if (!err){
    console.log('The solution is: ', rows);
    for (var i = 0; i < rows.length; i++) {
      console.log(rows[i].title);
    }
  }else{
    console.log('Error while performing Query.', err);
  }
});
connection.end();

// view engine (뷰 환경설정)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
