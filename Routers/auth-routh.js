const authRouter = require('express').Router();
const passport = require('passport');

// auth login
authRouter.get('/login', (req, res) => {
    req.session.returnTo = Buffer.from(req.query.redirect, 'base64').toString();
    res.redirect('/auth/google');
});

// auth logout
authRouter.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    // res.status(403).send();
    res.redirect('/');
});

// auth with google+
authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//callback route for google to redirect to
authRouter.get('/google/redirect', passport.authenticate('google'),(req, res) => {
    // res.send(req.user);
    res.redirect(req.session.returnTo);
});

module.exports = {authRouter};