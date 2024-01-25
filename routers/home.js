// routers/home.js

const router = require('express').Router();
const homeController = require('../controllers/home.controller');
const categoryController = require('../controllers/category.controller');
const productController = require('../controllers/product.controller');
const cartController = require('../controllers/cart.controller');

const checkLoggedIn = (req, res, next) => {
    if (req.isAuthenticated() && req.user.status) {
        return next();
    } else {
        return res.redirect('/auth/login');
    }
};

const checkIsAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return res.redirect('/admin');
    }
    next();
};

router.get('/', checkIsAdmin, homeController.getHome);
router.get('/shop', checkIsAdmin, homeController.getShop);
router.get('/category', checkIsAdmin, categoryController.getProductByCategory);
router.get('/search', checkIsAdmin, homeController.getSearch);
router.get('/product', checkIsAdmin, productController.getProduct);
router.get('/checkout', checkLoggedIn, cartController.getCheckout);
router.post('/order', checkLoggedIn, cartController.postOrder);

module.exports = router;