const {
  savePlanImp, getPlanImp, updatePlanImp, removePlanImp,
} = require('./plan.service.imp');

exports.savePlan = data => savePlanImp(data);
exports.getPlan = id => getPlanImp(id);
exports.updatePlan = (id, newData) => updatePlanImp(id, newData);
exports.removePlan = id => removePlanImp(id);
