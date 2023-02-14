var express = require('express');
var router = express.Router();
const User = require('../models/User.model');
const {loggedIn, loggedOut} = require('../middleware/guard');

router.get('/profile', loggedIn, (req, res, next) => {
  User.findOne()
    .then(profile => {
      res.render('profile.hbs', { user: profile.username });
    })
    .catch(error => {
      console.log('Error while getting the user: ', error);
      next(error);
    })
})

router.get('/teams', loggedIn, (req, res, next) => {
  res.render('teams/view.hbs');
});

router.get('/create', loggedIn, (req, res, next) => {
  res.render('teams/create.hbs');
});

module.exports = router;
