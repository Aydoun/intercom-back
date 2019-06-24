import express from 'express';
import { PersistPlan, getPlanById } from 'controllers/plan.controller.js';

const plans = express.Router();

plans.get('/:id', getPlanById);
plans.post('', PersistPlan);
// users.put('', update);
// users.delete('', remove);

module.exports = plans;
