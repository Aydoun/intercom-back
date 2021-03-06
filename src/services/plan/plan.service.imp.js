import PlanModel from 'models/plan.model';
import UserModel from 'models/user.model';

export const savePlanImp = (data) => {
  const newPlan = new PlanModel(data);
  return newPlan.save();
};

export const getPlanImp = id => PlanModel.find({ _id: id, status: 'Active' });
export const searchPlan = term => PlanModel.find({ $text: { $search: term }, status: 'Active' });
export const updatePlanImp = (id, newData) => {
  return PlanModel.updateOne({ _id: id }, newData)
  .then(() => {
    return newData;
  });
};
export const removePlanImp = id => PlanModel.updateOne({ _id: id }, { status: 'Inactive' });

export const registerLikeImp = (planId, userId) => {
  return UserModel.findById(userId)
    .then(user => {
      if (!user.likes[planId]) {
        user.likes[planId] = new Date().getTime();
        user.markModified('likes');
        return user.save();
      }
    })
    .then(saved => {
      if (saved) {
        return PlanModel.findByIdAndUpdate(planId, { $inc: { likes: 1 } });
      }
    })
    .then(savedPlan => {
      if (savedPlan) {
        return { likes: savedPlan.likes + 1 };
      }
    });
};

export const unregisterPlanImp = (planId, userId) => {
  return UserModel.findById(userId)
    .then(user => {
      user.plans = user.plans.filter(plan => plan._id.toString() !== planId);
      return user.save();
    })
    .then(savedUser => ({
      plans: savedUser.plans.length,
    }));
};

export const addIssueImp = (planId, userId, body) => {
  const { title, description } = body;

  return PlanModel.findById(planId)
    .then(plan => {
      const newIssue = {
        title,
        description,
        creator: userId,
      };
      plan.issues.push(newIssue);
      return plan.save();
    })
    .then(() => ({}));
};

export const getIssuesImp = id => {
  return PlanModel.findById(id)
    .then(plan => {
      return plan.issues;
    });
};

export const addIssueCommentImp = (issueId, planId, creator, text) => {
  return PlanModel.findById(planId)
    .then(plan => {
      const issueIndex = plan.issues.findIndex(item => item._id.toString() === issueId);

      if (issueIndex > -1) {
        plan.issues[issueIndex].comments.push({
          creator,
          text,
        });
        return plan.save();
      }
    });
};
