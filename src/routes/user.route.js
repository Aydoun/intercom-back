const users = require('express').Router();
const {
  userList, register, login, update, remove,
} = require('../controllers/user.controller');

users.get('/:id', userList);
users.post('', register);
users.post('/login', login);
users.put('', update);
users.delete('', remove);

module.exports = users;
