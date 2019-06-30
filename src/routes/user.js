import express from 'express';
import {
  userDetails, update, remove,
} from 'controllers/user.controller';

const users = express.Router();

users.get('', userDetails);
users.put('', update);
users.delete('', remove);

// Todo get user by username

module.exports = users;
