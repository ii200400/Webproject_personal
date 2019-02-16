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
  saveUninitialized: true,
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
  if (!req.user) {
    res.render('login');
  }else{
    res.redirect('/admin/menu');
  }
});
router.get('/menu', function(req, res, next) {
  if (req.user) {
    var search_sql = 'SELECT * FROM numbersof';
    connection.query(search_sql, function(err, rows, fields) {
      if (!err){
        res.render('basic', {numbers:rows[0], user: req.user.display});
      }else{
        console.log('Error while performing Query.', err);
      }
    });
  }else{
    res.redirect('/admin');
  }
});
router.get('/menu/consulting', function(req, res, next) {
  if (req.user) {
    var search_sql = 'SELECT * FROM consult';
    connection.query(search_sql, function(err, rows, fields) {
      if (!err){
        res.render('consulting', {rows:rows, user: req.user.display});
      }else{
        console.log('Error while performing Query.', err);
      }
    });
  }else{
    res.redirect('/admin');
  }
});
router.get('/menu/consulting/:id', function(req, res, next) {
  if (req.user) {
    var search_sql = 'SELECT * FROM consult';
    var number = req.params.id;
    connection.query(search_sql, function(err, rows, fields) {
      if (!err){
        res.render('consult_detail', {data:rows[number], user: req.user.display});
      }else{
        console.log('Error while performing Query.', err);
      }
    });
  }else{
    res.redirect('/admin');
  }
});
router.get('/menu/noticetable', function(req, res, next) {
  if (req.user) {
    var search_sql = 'SELECT * FROM notice_board';
    connection.query(search_sql, function(err, rows, fields) {
      if (!err){
        res.render('noticetable', {rows:rows, user: req.user.display});
      }else{
        console.log('Error while performing Query.', err);
      }
    });
  }else{
    res.redirect('/admin');
  }
});
router.get('/menu/noticetable/:id', function(req, res, next) {
  if (req.user) {
    var search_sql = 'SELECT * FROM notice_board';
    var number = req.params.id;
    connection.query(search_sql, function(err, rows, fields) {
      if (!err){
        res.render('noticetable_detail', {data:rows[number], user: req.user.display});
      }else{
        console.log('Error while performing Query.', err);
      }
    });
  }else{
    res.redirect('/admin');
  }
});
router.get('/menu/write', function(req, res, next) {
  if (req.user) {
    res.render('write', {user: req.user.display});
  }else{
    res.redirect('/admin');
  }
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
router.post('/delete', function(req, res, next) { //mysql삭제
  var consult_search_sql = 'SELECT * FROM consult WHERE id=?';
  var consult_search_params = [req.body.id];
  connection.query(consult_search_sql, consult_search_params, function(err, rows, fields) {
    var data = rows[0];
    if (data.answer===null) {
      var numbersof_update_sql = 'UPDATE numbersof SET consults=consults-1';
      connection.query(numbersof_update_sql, function(err, rows, fields) {
        if (!err){
        }else{
          console.log('Error while performing Query.', err);
        }
      });
    }else{
      var numbersof_update_sql = 'UPDATE numbersof SET consults=consults-1, answers=answers-1';
      connection.query(numbersof_update_sql, function(err, rows, fields) {
        if (!err){
        }else{
          console.log('Error while performing Query.', err);
        }
      });
    }
  });

  var consult_search_sql = 'DELETE FROM consult WHERE id=?';
  var consult_search_params = [req.body.id];
  connection.query(consult_search_sql, consult_search_params, function(err, rows, fields) {
    if (!err){
    }else{
      console.log('Error while performing Query.', err);
    }
  });

  res.redirect('/admin/menu/consulting');
});
router.post('/insert', function(req, res, next) { //mysql추가
  var notice_insert_sql = 'INSERT INTO notice_board(title, description, author, created) values (?, ?, ?, ?)';
  var notice_insert_params = [req.body.title, req.body.description, req.body.name, req.body.created];
  connection.query(notice_insert_sql, notice_insert_params, function(err, rows, fields) {
    if (!err){
      var numbersof_update_sql = 'UPDATE numbersof SET noticeTables=noticeTables+1';
      connection.query(numbersof_update_sql, function(err, rows, fields) {
        if (!err){
        }else{
          console.log('Error while performing Query.', err);
        }
      });
    }else{
      console.log('Error while performing Query.', err);
    }
  });

  res.redirect('/admin/menu/noticetable');
});

router.post('/update_notice', function(req, res, next) { //mysql업데이트
  var notice_update_sql = 'UPDATE notice_board SET description=? WHERE id=?';
  var notice_update_params = [req.body.description, req.body.id];
  connection.query(notice_update_sql, notice_update_params, function(err, rows, fields) {
    if (!err){
    }else{
      console.log('Error while performing Query.', err);
    }
  });

  res.redirect('/admin/menu/noticetable');
});
router.post('/delete_notice', function(req, res, next) { //mysql업데이트
  var notice_delete_sql = 'DELETE FROM notice_board WHERE id=?';
  var notice_delete_params = [req.body.id];
  connection.query(notice_delete_sql, notice_delete_params, function(err, rows, fields) {
    if (!err){
      var numbersof_update_sql = 'UPDATE numbersof SET noticeTables=noticeTables-1';
      connection.query(numbersof_update_sql, function(err, rows, fields) {
        if (!err){
        }else{
          console.log('Error while performing Query.', err);
        }
      });
    }else{
      console.log('Error while performing Query.', err);
    }
  });

  res.redirect('/admin/menu/noticetable');
});

//보안 로그인
passport.serializeUser(function(user, done) {
  done(null, user.userid);
});
passport.deserializeUser(function(id, done) {
  var sql = 'SELECT * FROM manager WHERE userid=?';
  connection.query(sql, [id], function(err, rows, fields) {
    if (!err){
      console.log(rows[0]);
      done(null, rows[0]);
    }else{
      console.log('Error while performing Query.', err);
      done("no user!");
    }
  });
});
passport.use(new LocalStrategy(
  function(username, password, done){
    //비밀번호 암호화
    var uname = username;
    var pwd = password;
    var sql = 'SELECT * FROM manager WHERE userid=?';
    connection.query(sql, [uname], function(err, rows, fields) {
      if (!err){
        var user = rows[0];
        console.log(user);
        return hasher({password:pwd, salt:user.salt},
          function(err, pass, salt, hash){
            console.log(pass);
            if (hash === user.password) {
              done(null, user);
            }else{
              done(null, false);
            }
          }
        );
      }else{
        console.log('Error while performing Query.', err);
      }
    });
  }
));
router.post(
  '/login',
  passport.authenticate(
    'local',
    { successRedirect: '/admin/menu',
    failureRedirect: '/admin',
    failureFlash: false
  })
);
router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/admin');
});

module.exports = router;
