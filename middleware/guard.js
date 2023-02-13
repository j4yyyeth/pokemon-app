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

module.exports = {
    loggedIn,
    loggedOut
}