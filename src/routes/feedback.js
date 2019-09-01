import express from 'express';
import { body } from 'express-validator';
import { catchValidationError } from 'utils/validation';
import * as C from 'controllers/feedback.controller';

const feedbacks = express.Router();

feedbacks.post('', [
  body('message').exists(),
], catchValidationError, C.saveFeedback);

module.exports = feedbacks;