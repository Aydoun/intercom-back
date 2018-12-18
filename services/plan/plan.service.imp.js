const PlanModel = require('../../models/plan.model');

exports.savePLanImp = data => {
    const newPlan = new PlanModel(data);
    return newPlan.save();
};

exports.getPlanImp = id => {
    return PlanModel.findById(id).lean()
};

exports.updatePlanImp = (id, newData) => {
    return PlanModel.updateOne({_id: id}, newData); 
};

exports.removePlanImp = id => {
    return PlanModel.updateOne({_id: id}, { status: 'Inactive' }); 
};
