const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/user.model');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await userModel.validateUser(username, password);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((id, done) => {
    done(null, id);
});

passport.deserializeUser((id, done) => {
    userModel.getUserById(id)
        .then(user => {
            // console.log(user);
            done(null, user);
        })
        .catch(err => {
            done(err, null);
        });
});


module.exports = passport;