import FeedbackModel from 'models/feedback.model';
import { pushActivity } from 'services/activity/activity.service';
import { ActivityPoint, ActivityType } from 'constants';

export const saveFeedback = (req, res) => {
  const { id } = req.tokenData;
  const { message, score } = req.body;
  const pointValue = ActivityPoint.feedback;
  const typeValue = ActivityType.feedback;

  const newFeedback = new FeedbackModel({ message, creator: id, score });

  return newFeedback.save(newFeedback)
  .then(() => res.formatResponse({}, 200, pointValue))
  .then(() => pushActivity(id, pointValue, typeValue))
  .catch(err => res.formatResponse(err.message, 401));
};



