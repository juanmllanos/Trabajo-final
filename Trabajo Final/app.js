const express = require('express')
const path = require('path')
const hbs = require('express-handlebars')
require('./config/mongo.js')
const session = require('express-session')

const authentication = (req, res, next) => {
    if (req.session.user) {
        next()
    } else res.render('noAuthentication')
}


const app = express()
const PORT = 5000

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.engine('.handlebars', hbs.engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.render('home', {user: req.session.user})
})

app.use('/message', require('./routers/routers.js'))

app.use('/user', require('./routers/routers.js'))

app.get('/noAuthentication', (req, res) => {
    res.render('noAuthentication')
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pageNotFound.html'))
})

app.listen(PORT)