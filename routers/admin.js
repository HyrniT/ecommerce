const router = require('express').Router();
const adminController = require('../controllers/admin.controller');

const checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/login');
    }
    next();
}

const checkIsAdmin = (req, res, next) => {
    if (req.user && !req.user.isAdmin) {
        return res.redirect('/');
    }
    next();
};

router.get('/', checkLoggedIn, checkIsAdmin, adminController.getHome);
router.get('/category', checkLoggedIn, checkIsAdmin, adminController.getCategory);
router.get('/product', checkLoggedIn, checkIsAdmin, adminController.getProduct);
router.get('/user', checkLoggedIn, checkIsAdmin, adminController.getUser);
router.get('/statistics', checkLoggedIn, checkIsAdmin, adminController.getStatistics);

module.exports = router;