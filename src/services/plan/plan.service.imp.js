import PlanModel from 'models/plan.model';

exports.savePlanImp = (data) => {
  const newPlan = new PlanModel(data);
  return newPlan.save();
};

exports.getPlanImp = id => PlanModel.find({ _id: id, status: 'Active' });

exports.updatePlanImp = (id, newData) => PlanModel.updateOne({ _id: id }, newData);

exports.removePlanImp = id => PlanModel.updateOne({ _id: id }, { status: 'Inactive' });
