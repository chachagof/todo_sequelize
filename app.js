const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const app = express()
const port = 3000

app.engine('hbs',exphbs.engine({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine','hbs')

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.get('/',(req,res)=>{
  res.send('hellow world')
})

app.listen(port,()=>{
  console.log(`It's working on http://localhost:${port}/`)
})