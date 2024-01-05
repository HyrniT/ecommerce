const authRouter = require('./auth');
const homeRouter = require('./home');

function router(app) {
    app.use('/', homeRouter);
    app.use('/auth', authRouter);
}

module.exports = router;
