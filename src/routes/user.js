import express from 'express';
import * as U from 'controllers/user.controller';

const users = express.Router();

users.get('', U.userDetails);
users.get('/plans', U.userPlansList);
users.put('', U.update);
users.delete('', U.remove);

// Todo get user by username

module.exports = users;
