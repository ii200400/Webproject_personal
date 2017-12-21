var express = require('express');
var router = express.Router();

var session = require('express-session'); //login session
var MySQLStore = require('express-mysql-session')(session);
var bkfd2Password = require("pbkdf2-password"); //login password to hasher
var hasher = bkfd2Password();
var passport = require('passport') //login authorize
var LocalStrategy = require('passport-local').Strategy;

var connection = require('../db')();

router.use(session({
  secret: '98DDV78QQEQHEC998DDH289DH9',
  resave: false,
  saveUninitaialized: true,
  store:new MySQLStore({
    host     : 'localhost',
    port     :  3306,
    user     : 'root',
    password : 'dudtjs972972',
    database : 'pilates'
  })
}));
router.use(passport.initialize());
router.use(passport.session());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});
router.get('/menu', function(req, res, next) {
  var search_sql = 'SELECT * FROM numbersof';
  connection.query(search_sql, function(err, rows, fields) {
    if (!err){
      res.render('basic', {numbers:rows[0]});
    }else{
      console.log('Error while performing Query.', err);
    }
  });
});
router.get('/menu/consulting', function(req, res, next) {
  var search_sql = 'SELECT * FROM consult';
  connection.query(search_sql, function(err, rows, fields) {
    if (!err){
      res.render('consulting', {rows:rows});
    }else{
      console.log('Error while performing Query.', err);
    }
  });
});
router.get('/menu/consulting/:id', function(req, res, next) {
  var search_sql = 'SELECT * FROM consult';
  var number = req.params.id;
  connection.query(search_sql, function(err, rows, fields) {
    if (!err){
      res.render('consult_detail', {data:rows[number]});
    }else{
      console.log('Error while performing Query.', err);
    }
  });
});

//서버에서만 사용
router.post('/update', function(req, res, next) { //mysql업데이트
  var answer = req.body.answer.replace(/ /gi, "")===""? null : req.body.answer;
  var consult_search_sql = 'SELECT * FROM consult WHERE id=?';
  var consult_search_params = [req.body.id]
  connection.query(consult_search_sql, consult_search_params, function(err, rows, fields) {
    var numbersof_update_sql = null
    if (!err){
      var preanswer = rows[0].answer;
      if (answer === null && preanswer !==null) {
        numbersof_update_sql = 'UPDATE numbersof SET answers=answers-1';
      }else if (answer !== null && preanswer ===null) {
        numbersof_update_sql = 'UPDATE numbersof SET answers=answers+1';
      }

      if (numbersof_update_sql !== null) {
        connection.query(numbersof_update_sql, function(err, rows, fields) {
          if (!err){
          }else{
            console.log('Error while performing Query.', err);
          }
        });
      }
    }else{
      console.log('Error while performing Query.', err);
    }
  });

  var consult_update_sql = 'UPDATE consult SET answer=? WHERE id=?';
  var consult_update_params = [answer, req.body.id]
  connection.query(consult_update_sql, consult_update_params, function(err, rows, fields) {
    if (!err){
    }else{
      console.log('Error while performing Query.', err);
    }
  });

  res.redirect('/admin/menu/consulting');
});

// passport.use(new LocalStrategy{
//   function(username, passward, done){
//     var username = username;
//     var password = passward;
//   }
// });
//보안 로그인
router.post('/login', function(req, res, next){
  var user = {
    username:'dudtjs',
    passward:'111',
    display: 'im'
  };

  var uname = req.body.username;
  var pas = req.body.passward;
  if(uname === user.username && pas === user.passward){
    req.session.display = user.display;
    req.session.save(function(){
      res.redirect('/admin/menu');
    });
  }else{
    res.redirect('/admin')
  }
});
router.get('/logout', function(req, res, next){
  delete req.session.display;
  req.session.save(function(){
    res.redirect('/admin')
  });
});

module.exports = router;
