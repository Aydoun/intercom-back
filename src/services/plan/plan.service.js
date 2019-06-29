import {
  savePlanImp, getPlanImp, updatePlanImp, removePlanImp,
} from './plan.service.imp';

const savePlan = data => savePlanImp(data);
const getPlan = id => getPlanImp(id);
const updatePlan = (id, newData) => updatePlanImp(id, newData);
const removePlan = id => removePlanImp(id);

module.exports = {
  savePlan,
  getPlan,
  updatePlan,
  removePlan,
};
