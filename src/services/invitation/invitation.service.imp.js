import InvitationModel from 'models/invitation.model';

exports.addInvitation = (data, requester) => {
  const newInvitation = new InvitationModel({ ...data, requester });
  return newInvitation.save();
};
