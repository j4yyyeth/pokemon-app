var express = require('express');
var router = express.Router();
const User = require('../models/User.model');
const Pokemon = require('../models/Pokemon.model');
const Team = require('../models/Team.model');
const {loggedIn, isTrainer, loggedOut} = require('../middleware/guard');

router.get('/profile', loggedIn, (req, res, next) => {
  Team.find({trainer: req.session.user._id})
  .populate('pokemon1')
  .populate('pokemon2')
  .populate('pokemon3')
  .populate('trainer')
  .then((foundTeams) => {
      res.render('profile.hbs', {foundTeams})
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

router.get('/delete/:id', isTrainer, (req, res, next) => {
  Team.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect('/users/profile')
    })
    .catch((err) => {
        console.log(err)
    })
})

router.get('/update/:id', (req, res, next) => {
  Team.findById(req.params.id)
  .populate('pokemon1')
  .populate('pokemon2')
  .populate('pokemon3')
    .then( async (found) => {
      // console.log(found);
      let findPokemon =  await Pokemon.find()
      .sort({order: 1})
        res.render('teams/update.hbs', {found, findPokemon})
    })
    .catch((err) => {
        console.log(err)
    })
})

router.post('/update/:id', (req, res, next) => {
  console.log(req.params.id);
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
        res.redirect('/users/profile')
    })
    .catch((err) => {
        console.log(err)
    })
})


module.exports = router;