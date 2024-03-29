const router = require('express').Router();

const cartController = require('../controllers/cart.controller');

const checkLoggedIn = (req, res, next) => {
    if (req.isAuthenticated() && req.user.status) {
        return next();
    } else {
        return res.redirect('/');
    }
};

router.get('/', checkLoggedIn, cartController.getCart);
router.post('/add', checkLoggedIn, cartController.postAddCart);
router.post('/update', checkLoggedIn, cartController.postUpdateCart);
router.get('/delete', checkLoggedIn, cartController.getDeleteCart);
router.get('/getTotalCarts', checkLoggedIn, cartController.getTotalCarts);

module.exports = router;