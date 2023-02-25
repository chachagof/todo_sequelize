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
router.get('/:id/edit',(req,res)=>{
  const UserId = req.user.id
  const id = req.params.id

  Todo.findOne({where:{id,UserId}})
    .then(todo=>res.render('edit', { todo: todo.toJSON() }))
    .catch(err=>console.log(err))
})

router.put('/:id',(req,res)=>{
  const UserId = req.user.id
  const id = req.params.id
  const {name,isDone} = req.body

  return Todo.findOne({where:{id,UserId}})
    .then(todo=>{
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => {
      console.log(`/todos/${id}`)
      return res.redirect(`/todos/${id}`)})
    .catch(err => console.log(err))
})
// delete

router.delete('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => todo.destroy())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router