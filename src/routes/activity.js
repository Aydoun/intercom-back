import express from 'express';
import * as A from 'controllers/activity.controller';
import { query } from 'express-validator';
import { catchValidationError } from 'utils/validation';

const activity = express.Router();

activity.get('', A.activityList);
activity.post('', [
  query('type').exists(),
], catchValidationError, A.createActivity);

export default activity;
