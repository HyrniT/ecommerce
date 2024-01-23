const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const upload = require('../utils/upload');

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

// const uploadImage = (req, res, next) => {
//     upload.single('image')(req, res, function (error) {
//         if (error) {
//             return res.json({
//                 success: false,
//                 message: error.message
//             });
//         }
//         next();
//     });
// }

router.get('/', checkLoggedIn, checkIsAdmin, adminController.getHome);
router.get('/category', checkLoggedIn, checkIsAdmin, adminController.getCategory);
router.get('/product', checkLoggedIn, checkIsAdmin, adminController.getProduct);
router.get('/user', checkLoggedIn, checkIsAdmin, adminController.getUser);
router.get('/statistics', checkLoggedIn, checkIsAdmin, adminController.getStatistics);
router.post('/add-category', checkLoggedIn, checkIsAdmin, upload.single('image'), adminController.postAddCategory);
router.post('/edit-category', checkLoggedIn, checkIsAdmin, upload.single('image'), adminController.postEditCategory);
router.delete('/delete-category/:id', checkLoggedIn, checkIsAdmin, adminController.deleteCategory);

module.exports = router;