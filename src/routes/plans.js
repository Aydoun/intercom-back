import express from 'express';
import * as C from 'controllers/plan.controller.js';
import { param, body, query } from 'express-validator';
import { isValidObjectId } from 'utils';
import { catchValidationError } from 'utils/validation';

const plans = express.Router();

plans.get('/search', query('term').exists(), catchValidationError, C.searchPlan);
plans.get('/:id', param('id').custom(value => isValidObjectId(value)), catchValidationError, C.getPlanById);
plans.post('', [
    body('username').exists(),
    body('email').isEmail(),
    body('description').exists(),
    body('title').exists(),
], catchValidationError, C.PersistPlan);
plans.put('/:id', param('id').custom(value => isValidObjectId(value)), catchValidationError, C.updateById);
plans.delete('/:id', param('id').custom(value => isValidObjectId(value)), catchValidationError, C.removeById);

module.exports = plans;
