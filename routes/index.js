var express = require('express');
var router = express.Router();

var connection = require('../db')();

/* GET home page. */
router.get('/main', function(req, res, next) {
  var numbersof_update_sql = 'UPDATE numbersof SET visiters=visiters+1';
  connection.query(numbersof_update_sql, function(err, rows, fields) {
    if (!err){
      res.render('main');
    }else{
      console.log('Error while performing Query.', err);
    }
  });
});
router.get('/facility', function(req, res, next) {
  res.render('facility');
});
router.get('/notice', function(req, res, next) {
  var search_sql = 'SELECT * FROM consult'
  connection.query(search_sql, function(err, rows, fields) {
    if (!err){
      res.render('notice', {rows:rows})
    }else{
      console.log('Error while performing Query.', err);
    }
  });
});
router.get('/info', function(req, res, next) {
  res.render('info');
});
router.get('/schedule', function(req, res, next) {
  res.render('schedule');
});

module.exports = router;
