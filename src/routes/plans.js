import express from 'express';
import { PersistPlan } from 'controllers/plan.controller.js';

const plans = express.Router();

plans.post('', PersistPlan);
// users.put('', update);
// users.delete('', remove);

module.exports = plans;
