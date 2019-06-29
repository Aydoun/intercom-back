import express from 'express';
import { PersistPlan, getPlanById, updateById, removeById } from 'controllers/plan.controller.js';
import { param, body } from 'express-validator';
import { isValidObjectId } from 'utils';

const plans = express.Router();

plans.get('/:id', param('id').custom((value) => {
    if (!isValidObjectId(value)) throw new Error('Passed id is invalid');
    return true;
}), getPlanById);
plans.post('', [
    body('username').not().isEmpty(),
    body('email').isEmail(),
    body('description').not().isEmpty(),
    body('title').not().isEmpty(),
], PersistPlan);
plans.put('/:id', param('id').custom((value) => {
    if (!isValidObjectId(value)) throw new Error('Passed id is invalid');
    return true;
}), updateById);
plans.delete('/:id', param('id').custom((value) => {
    if (!isValidObjectId(value)) throw new Error('Passed id is invalid');
    return true;
}), removeById);

module.exports = plans;
