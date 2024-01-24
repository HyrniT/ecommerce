const router = require('express').Router();

const cartController = require('../controllers/cart.controller');

const checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/login');
    }
    next();
}

router.get('/', checkLoggedIn, cartController.getCart);
router.post('/add', cartController.postAddCart);
router.post('/update', checkLoggedIn, cartController.postUpdateCart);
router.get('/delete', checkLoggedIn, cartController.getDeleteCart);

module.exports = router;