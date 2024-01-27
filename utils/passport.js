// utils/passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../models/user.model');

// local strategy
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await userModel.validateUser(username, password);
            user.isAdmin = user.username === 'admin';
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

// Google OAuth strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: '18014151335-l56kj0n02om02685p28cjif126g4o1l3.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'https://localhost:3000/auth/google/callback', // Update with your redirect URI
        },
        async (accessToken, refreshToken, profile, done) => {
            const user = await userModel.createGoogleUser(profile.emails[0].value, profile.displayName);
            return done(null, user);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    userModel.getUserById(id)
        .then(user => {
            user.isAdmin = user.username === 'admin';
            done(null, user);
        })
        .catch(err => {
            console.log(err);
            done(err, null);
        });
});

module.exports = passport;