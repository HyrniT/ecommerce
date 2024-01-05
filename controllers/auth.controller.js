const userModel = require('../models/user.model');
const passport = require('passport');

module.exports = {
    getRegister: (req, res) => {
        const messages = res.locals.messages;
        res.render('register', { messages });
    },
    getLogin: (req, res) => {
        const messages = res.locals.messages;
        res.render('login', { messages });
    },
    postRegister: async (req, res) => {
        const { username, password, retypePassword } = req.body;
        req.flash('username', username);

        if (password !== retypePassword) {
            req.flash('error', 'Passwords do not match');
            return res.redirect('/auth/register');
        }
        
        try {
            await userModel.createUser(username, password);
            req.flash('success', 'Registration successful. You can now log in.');
            res.redirect('/auth/login');
        } catch (error) {
            req.flash('error', error.message);
            res.redirect('/auth/register');
        }
    },
    // postLogin: async (req, res, next) => {
    //     const handleRemember = () => {
    //         if (req.body.remember) {
    //         }
    //     };

    //     const authenticateMiddleware = passport.authenticate('local', {
    //         successRedirect: '/',
    //         failureRedirect: '/auth/login',
    //         failureFlash: true,
    //     });

    //     const combinedMiddleware = (innerReq, innerRes, innerNext) => {
    //         handleRemember();
    //         authenticateMiddleware(innerReq, innerRes, innerNext);
    //     };

    //     combinedMiddleware(req, res, next);
    // },
    postLogin: (req, res, next) => {
        passport.authenticate('local', async (err, user) => {
            req.login(user, (err) => {
                if (err) {
                    req.flash('error', 'Invalid username or password');
                    return res.redirect('/auth/login');
                }
                req.flash('success', 'Login successful.');
                return res.redirect('/');
            });
        })(req, res, next);
    },

}