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

router.post('/add', (req, res) => {
  const newUser = req.body
  //  name: req.body.name,
  //  email: req.body.email
  db.addUser(newUser)
    .then(
      res.redirect('/users')
    )
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.patch('/:id', (req, res) => {
  // let userDetails = {}
  var obj = {
    id: req.params.id,
    name: req.body.name,
    email: req.body.email
  }

  db.updateUser(obj)
    .then(
      res.redirect('/users')
    )

})

module.exports = router
