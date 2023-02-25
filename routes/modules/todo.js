const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
const User = db.User

// create
router.get('/new',(req,res)=>{
  return res.render('new')
})

router.post('/',(req,res)=>{
  const UserId = req.user.id
  const {name} = req.body
  Todo.create({ name , UserId})
    .then(()=>res.redirect('/'))
    .catch(err=>console.log(err))
})
// detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => {res.render('detail', { todo: todo.toJSON() })})
    .catch(error => console.log(error))
})

// edit

// delete

module.exports = router