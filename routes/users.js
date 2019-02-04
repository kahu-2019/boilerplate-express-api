const express = require('express')

const db = require('../db')

const router = express.Router()


router.get('/', (req, res) => {
  db.getUsers()
    .then(users => {
      res.send({ users: users })
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  db.getUser(id)
    .then(user => {
      res.json({ user: user })
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/addnew', (req, res) => {
  const newUser = req.body

  console.log(newUser)
  db.addUser(newUser)
    .then(() => {
      res.redirect('/')
    })
})

router.patch('/id:', (req, res) => {
  let userDetails = req.body
  userDetails.id = req.params.id
  db.updateUser(userDetails)
    .then(recordCount => {
      res.send('hello')
    })
})



module.exports = router

