var express = require('express');
var router = express.Router();
const User = require('../models/User.model');
const Pokemon = require('../models/Pokemon.model');
const Team = require('../models/Team.model');
const {loggedIn, loggedOut} = require('../middleware/guard');

router.get('/profile', loggedIn, (req, res, next) => {
  // User.findOne()
  //   .then(profile => {
      res.render('profile.hbs');//, { user: profile.username }
    // })
    // .catch(error => {
    //   console.log('Error while getting the user: ', error);
    //   next(error);
    // })
})

router.get('/teams', loggedIn, (req, res, next) => {
  Team.find()
    .then((team) => {
      res.render('teams/view.hbs', {team});
    })
    .catch((err) => {
        console.log(err)
    })
});

router.get('/create', loggedIn, (req, res, next) => {
  Pokemon.find()
  .sort({order: 1})
    .then((pokemon) => {
      res.render('teams/create.hbs', {pokemon});
    })
    .catch((err) => {
        console.log(err)
    })
});

router.post('/create', loggedIn, (req, res, next) => {
  Team.create({
    pokemon1: req.body.pokemon1,
    pokemon2: req.body.pokemon2,
    pokemon3: req.body.pokemon3,
    trainer: req.session.user._id
})
.then((data)=>{
  console.log(data);
    res.redirect('/users/teams')
})
.catch((err)=>{
    res.render('movies/new-movie.hbs');
    console.log(err);
})
})

module.exports = router;