var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Pilates' });
});
router.get('/sample', function(req, res, next) {
  res.render('sample');
});

module.exports = router;