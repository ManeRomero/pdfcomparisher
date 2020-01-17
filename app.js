const express = require('express')
const exphbars = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
const bodyParser = require('body-parser')
const override = require('method-override')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbars({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}))
app.set('view engine', '.hbs')

app.use(express.static(path.join(__dirname, 'uploads')));

app.use(session({
    name: 'userSession',
    secret: 'myS3cr3tK3y',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 1000,
        Secure: true
    }
}))

app.use(flash())
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.session.user;
    next()
})



app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(override('_method'))

app.use(require('./rutas/comparador'))

module.exports = app;