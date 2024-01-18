const router = require('express').Router();
const authController = require('../controllers/auth.controller');

const checkLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
};

router.get('/register', authController.getRegister);
router.get('/login', checkLoggedIn, authController.getLogin);
router.get('/logout', authController.getLogout);
router.post('/register', authController.postRegister);
router.post('/login', authController.postLogin);

router.get('/google', authController.getGoogleLogin);
router.get('/google/callback', authController.getGoogleCallback);

module.exports = router;
