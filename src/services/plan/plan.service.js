import {
  savePlanImp, getPlanImp, updatePlanImp, removePlanImp,
} from './plan.service.imp';

const savePlan = savePlanImp;
const getPlan = getPlanImp;
const updatePlan = updatePlanImp;
const removePlan = removePlanImp;

module.exports = {
  savePlan,
  getPlan,
  updatePlan,
  removePlan,
};
