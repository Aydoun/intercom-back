import express from 'express';
import { PersistPlan, getPlanById, updateById, removeById } from 'controllers/plan.controller.js';
import { param, body } from 'express-validator';
import { isValidObjectId } from 'utils';
import { catchValidationError } from 'utils/validation';

const plans = express.Router();

plans.get('/:id', param('id').custom(value => isValidObjectId(value)), catchValidationError, getPlanById);
plans.post('', [
    body('username').exists(),
    body('email').isEmail(),
    body('description').exists(),
    body('title').exists(),
], catchValidationError, PersistPlan);
plans.put('/:id', param('id').custom(value => isValidObjectId(value)), catchValidationError, updateById);
plans.delete('/:id', param('id').custom(value => isValidObjectId(value)), catchValidationError, removeById);

module.exports = plans;
