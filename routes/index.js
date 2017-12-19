var express = require('express');
var router = express.Router();

var connection = require('../db')();

/* GET home page. */
router.get('/', function(req, res, next) {
  var numbersof_update_sql = 'UPDATE numbersof SET visiters=visiters+1';
  connection.query(numbersof_update_sql, function(err, rows, fields) {
    if (!err){
      res.render('index');
    }else{
      console.log('Error while performing Query.', err);
    }
  });
});
router.get('/work', function(req, res, next) {
  res.render('work');
});
router.get('/work2', function(req, res, next) {
  var search_sql = 'SELECT * FROM consult'
  connection.query(search_sql, function(err, rows, fields) {
    if (!err){
      res.render('work2', {rows:rows})
    }else{
      console.log('Error while performing Query.', err);
    }
  });
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
