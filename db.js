const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getUsers,
  getUser,
  addUser
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

function updateUser(user, testDb) {
  const db = testDb || connection
  return db('users').where('id', user.id).update(user)
}