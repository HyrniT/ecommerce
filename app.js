require('dotenv').config()
const express = require('express')
const handlebars = require('express-handlebars')
const flash = require('express-flash')
const cors = require('cors')
const session = require('express-session')
const passport = require('./utils/passport')
const path = require('path')
const router = require('./routers/index')

const app = express()
const port = process.env.PORT || 3000

app.set('trust proxy', 1)
app.use(session({
    secret: "secret",
    saveUninitialized: true,
    cookie: { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true },
    resave: false,
}))
app.use(cors())
app.use(flash())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    // res.locals.currentUser = req.session.passport ? req.session.passport.user : null;
    res.locals.messages = {
        error: req.flash('error'),
    };
    next();
});

app.engine('hbs', handlebars.engine({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))
// app.use('/css', express.static(__dirname + 'public/css'))
// app.use('/js', express.static(__dirname + 'public/js'))
// app.use('/img', express.static(__dirname + 'public/img'))


router(app)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});