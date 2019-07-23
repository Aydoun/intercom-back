import express from 'express';
import * as U from 'controllers/user.controller';
import { param } from 'express-validator';
import { isValidObjectId } from 'utils';
import { catchValidationError } from 'utils/validation';

const users = express.Router();

users.get('', U.userDetails);
users.get('/plans', U.userPlansList);
users.get('/:id', param('id').custom(value => isValidObjectId(value)), catchValidationError, U.getUserById);
users.put('', U.update);
users.delete('', U.remove);

// Todo get user by username

module.exports = users;
