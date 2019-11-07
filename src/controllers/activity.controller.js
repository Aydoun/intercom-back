
import * as A from 'services/activity/activity.service';
import { ActivityPoint, ActivityType } from 'constants';

export const activityList = (req, res) => {
  const { id } = req.tokenData;

  return A.getActivity(id)
    .then(list => res.formatResponse(list))
    .catch(err => res.formatResponse(err.message, 401));
};

export const createActivity = (req, res) => {
  const { tokenData: { id }, query: { type } } = req;
  const pointValue = ActivityPoint[type] || 0;
  const typeValue = ActivityType[type] || 0;

  return A.pushActivity(id, pointValue, typeValue)
    .then(list => res.formatResponse(list))
    .catch(err => res.formatResponse(err.message, 401));
};
