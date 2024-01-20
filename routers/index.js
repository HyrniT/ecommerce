const authRouter = require('./auth');
const homeRouter = require('./home');
const adminRouter = require('./admin');

function router(app) {
    app.use('/', homeRouter);
    app.use('/auth', authRouter);
    app.use('/admin', adminRouter);
}

module.exports = router;
