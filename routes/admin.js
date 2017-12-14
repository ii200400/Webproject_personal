var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'dudtjs972972',
  database : 'pilates'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin');
});
router.get('/consulting', function(req, res, next) {
  res.render('admin_consulting');
});

module.exports = router;
