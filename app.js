const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const routes = require('./routes/index')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')

if(process.env.NODE_ENV != 'production'){
  require('dotenv').config()
}

const app = express()
const PORT = process.env.PORT

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(flash())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`It's working on http://localhost:${PORT}/`)
})