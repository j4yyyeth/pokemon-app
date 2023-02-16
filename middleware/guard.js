const loggedIn = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    next();
}

const loggedOut = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/home');
    }
    next();
}

const isTrainer = (req, res, next) => {

    Team.findById(req.params.id)
    .populate('trainer')
    .then((foundTeam) => {
        if (!req.session.user || foundTeam.trainer._id.toString() !== req.session.user._id) {
            res.redirect('/home', {errorMessage: "You are not authorized."})
        } else {
            next()
        }
    })
    .catch((err) => {
        console.log(err)
    })

}

module.exports = {
    loggedIn,
    loggedOut,
    isTrainer
}