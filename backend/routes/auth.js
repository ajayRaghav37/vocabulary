var express = require('express');
var router = express.Router();

module.exports = function (passport) {

    //sends successful login state back to angular
    router.get('/success', function (req, res) {
        res.send({
            state: 'success',
            user: req.user ? req.user : null
        });
    });

    //sends failure login state back to angular
    router.get('/loginFailure', function (req, res) {
        res.send({
            state: 'failure',
            user: null,
            message: "Invalid username or password"
        });
    });

    //sends failure login state back to angular
    router.get('/signupFailure', function (req, res) {
        res.send({
            state: 'failure',
            user: null,
            message: "Username already taken"
        });
    });

    //log in
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/loginFailure'
    }));

    //sign up
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/signupFailure'
    }));

    //log out
    router.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;

};