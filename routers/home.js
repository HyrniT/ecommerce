const router = require('express').Router();
const homeController = require('../controllers/home.controller');

const checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/login');
    }
    next();
};

router.get('/', checkLoggedIn, homeController.getHome);

module.exports = router;