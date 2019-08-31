import PlanModel from 'models/plan.model';

exports.savePlanImp = (data) => {
  const newPlan = new PlanModel(data);
  return newPlan.save();
};

exports.getPlanImp = id => PlanModel.find({ _id: id, status: 'Active' });
exports.searchPlan = term => PlanModel.find({ $text: { $search: term },  status: 'Active'});
exports.updatePlanImp = (id, newData) => PlanModel.updateOne({ _id: id }, newData);
exports.removePlanImp = id => PlanModel.updateOne({ _id: id }, { status: 'Inactive' });

exports.registerLikeImp = (planId, userId) => {
  return PlanModel.findById(planId)
  .then(plan => {
    const alreadyLiked = plan.likes.indexOf(userId) > -1;

    if (!alreadyLiked) {
      plan.likes.push(userId);
      return plan.save();
    }

    return { likes: plan.likes.length };
  });
};