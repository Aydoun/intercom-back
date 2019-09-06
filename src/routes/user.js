import express from 'express';
import * as C from 'controllers/user.controller';
import { check, query, body } from 'express-validator';
import { catchValidationError } from 'utils/validation';

const users = express.Router();

users.get('', C.userDetails);
users.get('/plans', C.userPlansList);
users.get('/search', query('name').exists(), catchValidationError, C.searchByname);
users.get('/activity', C.listActivity);
users.get('/intersection', query('userId').isMongoId(), catchValidationError, C.planIntersection);
users.get('/:id', check('id').isMongoId(), catchValidationError, C.getUserById);
users.post('/activity', body('actionType').exists(), catchValidationError, C.addActivity);
users.put('', C.update);
users.delete('', C.remove);

module.exports = users;
