import InvitationModel from 'models/invitation.model';

exports.addInvitation = (data, requester) => {
  const newInvitation = new InvitationModel({ ...data, requester });
  return newInvitation.save();
};

export const getInvitationList = userId => {
  return InvitationModel.find({requested: userId, status: 'Pending'});
};

export const answerInvitation = (invitationId, answer, userId) => {
  const answers = {
    0: 'Rejected',
    1: 'Accepted',
  };

  return InvitationModel.updateOne({ _id: invitationId, requested: userId }, { status: answers[answer] });
};
