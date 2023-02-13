var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');
var saltRounds = 10;
const User = require('../models/User.model');
const {loggedIn, loggedOut} = require('../middleware/guard');
/* signup page */
router.get('/', (req, res, next)=>{
  res.render('signup.hbs');
});

router.post('/', (req, res, next) => {

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.render('signup.hbs', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
    return;
  }
 
  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => {
      return bcryptjs.hash(password, salt)
    })
    .then((hashedPassword) => {
      return User.create({
        username,
        email,
        password: hashedPassword
      });
    })
    .then((userFromDB) => {
      console.log('Newly created user is: ', userFromDB);
      res.redirect('/home')
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('signup.hbs', { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render('signup.hbs', {
           errorMessage: 'Username and email need to be unique. Either username or email is already used.'
        });
      } else {
        next(error);
      }
    })
})

router.get('/login', (req, res, next)=>{
  res.render('login.hbs');
})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.render('login.hbs', {
      errorMessage: 'Please enter both, username and password to login.'
    });
    return;
  }
 
  User.findOne({ username })
    .then(user => {
      if (!user) {
        res.render('login.hbs', { errorMessage: 'username or password are incorrect' });
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {
        req.session.user = user
        res.redirect('/home');
      } else {
        res.render('login.hbs', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});

router.get('/home', loggedIn, (req, res, next)=>{
  res.render('index.hbs');
})

router.get('/pokemon', loggedIn, (req, res, next)=>{
  res.render('pokemon.hbs');
})

router.get('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err);
    res.redirect('/');
  });
});

module.exports = router;
