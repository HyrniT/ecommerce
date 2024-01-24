const authRouter = require('./auth');
const homeRouter = require('./home');
const adminRouter = require('./admin');
const cartRouter = require('./cart');

function router(app) {
    app.use('/', homeRouter);
    app.use('/auth', authRouter);
    app.use('/admin', adminRouter);
    app.use('/cart', cartRouter);
}

module.exports = router;
