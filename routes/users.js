var express = require('express');
var router = express.Router();
const User = require('../models/User.model');
const Pokemon = require('../models/Pokemon.model');
const Team = require('../models/Team.model');
const {loggedIn, loggedOut} = require('../middleware/guard');

router.get('/profile', loggedIn, (req, res, next) => {
  Team.find()
  .populate('pokemon1')
  .populate('pokemon2')
  .populate('pokemon3')
  .populate('trainer')
    .then((team) => {
      res.render('profile.hbs', {team});
    })
    .catch((err) => {
        console.log(err)
    })
})

router.get('/teams', loggedIn, (req, res, next) => {
  Team.find()
  .populate('pokemon1')
  .populate('pokemon2')
  .populate('pokemon3')
  .populate('trainer')
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
    trainer: req.session.user._id,
    teamName: req.body.teamName
})
.then((data)=>{
  console.log(data);
    res.redirect('/users/teams')
})
.catch((err)=>{
    res.redirect('/home');
    console.log(err);
})
})

router.get('/update', (req, res, next) => {
  Team.findById(req.params.id)
    .then((foundTeam) => {
        res.render('teams/update.hbs', foundTeam)
    })
    .catch((err) => {
        console.log(err)
    })
})

router.post('/update', (req, res, next) => {
  const { pokemon1, pokemon2, pokemon3, teamName } = req.body
    Team.findByIdAndUpdate(req.params.id, 
        {
            pokemon1, 
            pokemon2,
            pokemon3,
            teamName
        },
        {new: true})
    .then((updatedTeam) => {
        console.log(updatedTeam)
        res.redirect(`/users/teams`)
    })
    .catch((err) => {
        console.log(err)
    })
})

module.exports = router;