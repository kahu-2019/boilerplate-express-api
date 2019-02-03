const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser
}

function getUsers(testDb) {
  const db = testDb || connection
  return db('users').select()
}

function getUser(id, testDb) {
  const db = testDb || connection
  return db('users').where('id', id).first()
}

function addUser(newUser, testDb) {
  const db = testDb || connection
  return db('users').insert(newUser)
}

function updateUser(id, user, testDb) {
  const db = testDb || connection
  updatedUser = {
    name: user.name,
    email: user.email
  }
  return db('users')
    .update(updatedUser)
    .where('id', id)
}
