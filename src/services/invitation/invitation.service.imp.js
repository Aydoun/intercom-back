import InvitationModel from 'models/invitation.model';
import UserModel from 'models/user.model';

exports.addInvitation = (data, requester) => {
  const newInvitation = new InvitationModel({ ...data, requester });
  return newInvitation.save();
};

export const getInvitationList = userId => {
  return InvitationModel.find({requested: userId, status: 'Pending'});
};

export const answerInvitation = (invitationId, answer, userId, planId) => {
  const answers = {
    0: 'Rejected',
    1: 'Accepted',
  };

  return InvitationModel.updateOne({ _id: invitationId, requested: userId }, { status: answers[answer] })
  .then(() => {
    if (Number(answer) === 1) {
      return UserModel.findById(userId)
      .then(user => {
        user.plans.push(planId);
        user.save();
      })
      .then(() => ({ save: 'PASS' }));
    }

    return { save: 'PASS' };
  });
};
