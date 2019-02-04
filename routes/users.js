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
  let newUser = req.body
  db.addUser(newUser)
    .then(ids => {
      res.json('ids[0]')
    })

})

router.post('/updateuser/:id', (req, res) => {
  let id = req.params.id
  let user = req.body
  db.updateUser(id, user)
    .then(ids => {
      res.json('ids[0]')
    })

})

module.exports = router

