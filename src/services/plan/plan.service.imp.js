import PlanModel from 'models/plan.model';
import UserModel from 'models/user.model';
import LikesModel from 'models/likes.model';

export const savePlanImp = (data) => {
  const newPlan = new PlanModel(data);
  return newPlan.save();
};

export const getPlanImp = id => PlanModel.find({ _id: id, status: 'Active' });
export const searchPlan = term => PlanModel.find({ $text: { $search: term }, status: 'Active' });
export const updatePlanImp = (id, newData) => PlanModel.updateOne({ _id: id }, newData);
export const removePlanImp = id => PlanModel.updateOne({ _id: id }, { status: 'Inactive' });

export const registerLikeImp = (planId, userId) => {
  return LikesModel.find({ planId })
    .then(likes => {
      const isUserListed = likes.usersList.find(user => user === userId);

      if (!isUserListed) {
        const newLike = new LikesModel({ planId, usersList: [userId] });
        newLike.save();
      }
    });
  // return PlanModel.findById(planId)
  // .then(plan => {
  //   const alreadyLiked = plan.likes.indexOf(userId) > -1;

  //   if (!alreadyLiked) plan.likes.push(userId);

  //   return plan.save().then(() => ({ likes: plan.likes.length }));
  // });
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
