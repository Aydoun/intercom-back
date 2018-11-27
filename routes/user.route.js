const users = require('express').Router();
const { userList } = require('../controllers/user.controller');

users.get('/:id', userList);

module.exports = users;
