import FeedbackModel from 'models/feedback.model';

exports.saveFeedback = (req, res) => {
  const { id } = req.tokenData;
  const { message, score } = req.body;

  const newFeedback = new FeedbackModel({ message, creator: id, score });

  newFeedback.save(newFeedback)
  .then(() => res.formatResponse({}))
  .catch(err => res.formatResponse(err.message, 401));
};



