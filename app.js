// https://themewagon.github.io/ogani/#

require('dotenv').config()
const express = require('express')
const handlebars = require('express-handlebars')
const flash = require('express-flash')
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
app.use(flash())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())
app.use(passport.session())

// Middleware để truyền thông tin user và messages cho tất cả các route
app.use((req, res, next) => {
    res.locals.currentUser = req.session.passport ? req.session.passport.user : null;
    console.log(res.locals.currentUser);
    res.locals.messages = {
        success: req.flash('success'),
        error: req.flash('error'),
        username: req.flash('username'),
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

app.listen(port, () => console.log('Server started...'))