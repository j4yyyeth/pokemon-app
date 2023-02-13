var express = require('express');
var router = express.Router();
const {loggedIn, loggedOut} = require('../middleware/guard');

/* GET users listing. */
router.get('/profile', function(req, res, next) {
  res.render('profile.hbs');
});

router.get('/teams', function(req, res, next) {
  res.render('teams/view.hbs');
});

router.get('/create', function(req, res, next) {
  res.render('teams/create.hbs');
});

module.exports = router;
