const express = require('express')

const users = require('./routes/users')
const bodyParser = require('body-parser')

const server = express()

// Middleware
server.use(express.json())

// Routes
server.use('/users', users)

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

module.exports = server
