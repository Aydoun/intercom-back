import FeedbackModel from 'models/feedback.model';
import { pushActivity } from 'services/activity/activity.service';
import { ActivityPoint, ActivityType } from 'constants';

export const saveFeedback = (req, res) => {
  const { id } = req.tokenData;
  const { message, score } = req.body;

  const newFeedback = new FeedbackModel({ message, creator: id, score });

  return newFeedback.save(newFeedback)
  .then(() => res.formatResponse({}))
  .then(() => {
    const pointValue = ActivityPoint.feedback;
    const typeValue = ActivityType.feedback;

    return pushActivity(id, pointValue, typeValue);
  })
  .catch(err => res.formatResponse(err.message, 401));
};



