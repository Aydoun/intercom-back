import express from 'express';
import { PersistPlan, getPlanById, updateById, removeById } from 'controllers/plan.controller.js';
import { param, body } from 'express-validator';
import { isValidObjectId } from 'utils';

const plans = express.Router();

plans.get('/:id', param('id').custom(value => isValidObjectId(value)), getPlanById);
plans.post('', [
    body('username').exists(),
    body('email').isEmail(),
    body('description').exists(),
    body('title').exists(),
], PersistPlan);
plans.put('/:id', param('id').custom(value => isValidObjectId(value)), updateById);
plans.delete('/:id', param('id').custom(value => isValidObjectId(value)), removeById);

module.exports = plans;
