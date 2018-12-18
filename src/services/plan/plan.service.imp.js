const PlanModel = require('../../models/plan.model');

exports.savePLanImp = (data) => {
  const newPlan = new PlanModel(data);
  return newPlan.save();
};

exports.getPlanImp = id => PlanModel.findById(id).lean();

exports.updatePlanImp = (id, newData) => PlanModel.updateOne({ _id: id }, newData);

exports.removePlanImp = id => PlanModel.updateOne({ _id: id }, { status: 'Inactive' });
