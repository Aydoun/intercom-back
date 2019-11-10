import ActivityModel from 'models/activity.model';
import UserModel from 'models/user.model';

export const getActivityImp = user => {
  return ActivityModel.find({ user })
  .then(activity => {
    return activity;
  });
};

export const pushActivityImp = (user, value, actionType) => {
  return ActivityModel.find({ user })
  .then(activity => {
    if (activity.length === 0) {
      const newActivity = new ActivityModel({
        user,
        history: [{
          actionType,
          value,
        }],
      });

      return newActivity.save();
    } 

    const activityItem = activity[0];
    activityItem.history.push({
      actionType,
      value,
    });
    return activityItem.save();
  })
  .then(() => {
    return UserModel.findByIdAndUpdate(user, { $inc: { points: value } });
  })
  .then(() => {
    return {};
  });
};
