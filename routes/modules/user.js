const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
const User = db.User

// login 
router.get('/login',(req,res)=>{
  res.render('login')
})
router.post('/login',(req,res)=>{
  res.send('login')
})

// register
router.get('/register',(req,res)=>{
  res.render('register')
})
router.post('/register',(req,res)=>{
  const { name , email , password , confirmPassword } = req.body
  User.create({ name , email , password })
    .then(user=>res.redirect('/'))
})

// logout
router.get('/logout',(req,res)=>{
  res.send('logout')
})

module.exports = router