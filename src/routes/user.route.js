const users = require('express').Router();
const {
  userDetails, update, remove,
} = require('../controllers/user.controller');

users.get('', userDetails);
users.put('', update);
users.delete('', remove);

module.exports = users;
