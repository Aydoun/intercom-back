import express from 'express';
import * as U from 'controllers/user.controller';
import { check, query, body } from 'express-validator';
import { catchValidationError } from 'utils/validation';

const users = express.Router();

users.get('', U.userDetails);
users.get('/plans', U.userPlansList);
users.get('/search', query('name').exists(), catchValidationError, U.searchByname);
users.get('/activity', U.listActivity);
users.get('/:id', check('id').isMongoId(), catchValidationError, U.getUserById);
users.post('/activity', body('actionType').exists(), catchValidationError, U.addActivity);
users.put('', U.update);
users.delete('', U.remove);

module.exports = users;
