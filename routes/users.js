const express = require('express')

const db = require('../db')

const router = express.Router()

router.get('/', (req, res) => {
  db.getUsers()
    .then(users => {
      res.send({users: users})
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  db.getUser(id)
    .then(user => {
      res.json({user: user})
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})



router.post('/adduser', (req,res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email
  }
  db.addUser(newUser)
  .then(
    res.redirect('/users')
  )
  .catch(err => {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
})

router.post('/updateuser', (req,res) => {
  const id = req.body.id
  const updateduser = {
    name: req.body.name,
    email: req.body.email
  }
  db.updateUser(id, updateduser)
  .then(
    res.redirect('/users')
  )
  .catch(err => {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
})

module.exports = router

