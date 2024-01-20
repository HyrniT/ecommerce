// routers/home.js

const router = require('express').Router();
const homeController = require('../controllers/home.controller');

const checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/login');
    }
    next();
};

const checkIsAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return res.redirect('/admin');
    }
    next();
};

router.get('/', checkIsAdmin, homeController.getHome);

module.exports = router;