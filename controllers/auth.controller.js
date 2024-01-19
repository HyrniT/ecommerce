const userModel = require('../models/user.model');
const passport = require('passport');

module.exports = {
    getRegister: (req, res) => {
        res.render('register', {
            messages: res.locals.messages, 
            title: 'Register',
            layout: 'auth'
        });
    },
    getLogin: (req, res) => {
        res.render('login', { 
            messages: res.locals.messages, 
            title: 'Login',
            layout: 'auth' 
        });
    },
    postRegister: async (req, res) => {
        const { name, username, password, retypePassword } = req.body;

        if (!name || !username || !password || !retypePassword) {
            req.flash('error', 'Please enter all fields');
            return res.redirect('/auth/register');
        }

        if (password !== retypePassword) {
            req.flash('error', 'Passwords do not match');
            return res.redirect('/auth/register');
        }

        if (password.length < 3) {
            req.flash('error', 'Password must be at least 3 characters');
            return res.redirect('/auth/register');
        }
        
        try {
            await userModel.createUser(name.trim(), username.trim(), password);
            res.redirect('/auth/login');
        } catch (error) {
            req.flash('error', error.message);
            res.redirect('/auth/register');
        }
    },
    // postLogin: (req, res) => {
    //     passport.authenticate('google', {
    //         failureRedirect: '/auth/login',
    //         successRedirect: '/',
    //         failureFlash: true,
    //     })(req, res);
    // },
    postLogin: (req, res) => {
        passport.authenticate('local', async (err, id) => {
            req.login(id, async (err) => {
                if (err) {
                    req.flash('error', 'Invalid username or password');
                    return res.redirect('/auth/login');
                }
                // if (id === "admin") {
                //     return res.render('admin', {
                //         messages: res.locals.messages,
                //         title: 'Admin',
                //         layout: 'auth'
                //     });
                // }
                return res.redirect('/');
            });
        })(req, res);
    },
    getLogout: (req, res) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    },
    getGoogleLogin: (req, res) => {
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        })(req, res);
    },
    // getGoogleCallback: (req, res) => {
    //     passport.authenticate('google', {
    //         failureRedirect: '/auth/login',
    //         successRedirect: '/',
    //         failureFlash: true,
    //     })(req, res);
    // },
    getGoogleCallback: (req, res) => {
        passport.authenticate('google', async (err, id) => {
            req.login(id, async (err) => {
                if (err) {
                    req.flash('error', 'Authentication failed');
                    return res.redirect('/auth/login');
                }
                return res.redirect('/');
            });
        })(req, res);
    },
}