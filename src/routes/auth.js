import express from 'express';
import { body } from 'express-validator';
import { login, register } from 'controllers/user.controller';
import { catchValidationError } from 'utils/validation';

const auth = express.Router();

auth.post('/api/user/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('name').not().isEmpty()
], catchValidationError, register);
auth.post('/api/user/login', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], catchValidationError, login);

module.exports = auth;
