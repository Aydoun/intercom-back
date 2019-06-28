import express from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { check } from 'express-validator';
import { login, register } from 'controllers/user.controller';

const auth = express.Router();

auth.post('/api/user/register', register);
auth.post('/api/user/login', [
  check('email').isEmail(),
  check('password').isLength({ min: 8 })
], login);

// Token Check
auth.use((req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    try {
      const decoded = jwt.decode(token, config.secret);
      req.tokenData = decoded;
      next();
      return 0;
    } catch (err) {
      return res.formatResponse({
        message: 'Invalid Token',
      }, 403);
    }
  } else {
    return res.formatResponse({
      message: 'No token provided.',
    }, 403);
  }
});

module.exports = auth;
