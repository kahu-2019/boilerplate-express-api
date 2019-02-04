/* global jest test expect */
jest.mock('../../db', () => ({
  getUser: (id) => Promise.resolve(
    { id: id, name: 'test user', email: 'test@user.nz' }
  ),
  getUsers: () => Promise.resolve([
    { id: 2, name: 'test user 2', email: 'test2@user.nz' },
    { id: 4, name: 'test user 4', email: 'test4@user.nz' }
  ]),
  addUser: () => Promise.resolve([
    123
  ]),
  updateUser: () => Promise.resolve([
    { name: "tim", email: 'forloop@loop.com' }
  ])
}))

const request = require('supertest')

const server = require('../../server')


test('/users returns all users', () => {
  const expected = 2
  return request(server)
    .get('/users')
    .expect("Content-Type", /json/)
    .expect(200)
    .then(res => {
      expect(res.body.users.length).toBe(expected)
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})

test('/users/:id returns a user by ID', () => {
  const expected = 'test@user.nz'
  return request(server)
    .get('/users/10')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(res => {
      expect(res.body.user.id).toBe(10)
      expect(res.body.user.email).toBe(expected)
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})

test('/users/addnew', () => {
  return request(server)
    .post("/users/addnew")
    .expect('Content-Type', /json/)
    .expect(200)
    .then(res => {
      expect(res.body).toBeTruthy()
      expect(res.body.id).toBeTruthy()
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})

test('/users/id:', () => {
  return request(server)
    .patch('/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(res => {

      expect(res.body).toBeTruthy()
      // expect(res.body.toBeTruthy()
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })

})