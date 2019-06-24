import express from 'express';
import { PersistPlan, getPlanById, updateById, removeById } from 'controllers/plan.controller.js';

const plans = express.Router();

plans.get('/:id', getPlanById);
plans.post('', PersistPlan);
plans.put('/:id', updateById);
plans.delete('/:id', removeById);

module.exports = plans;
