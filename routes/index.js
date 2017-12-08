var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/work', function(req, res, next) {
  res.render('work');
});
router.get('/work2', function(req, res, next) {
  res.render('work2');
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
