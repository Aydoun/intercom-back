import { addInvitation, getInvitationList, answerInvitation } from 'services/invitation/invitation.service';

export const PersistInvitation = (req, res) => { 
    const { id: requester } = req.tokenData;
    
    addInvitation(req.body, requester)
    .then(invitation => {
        res.formatResponse(invitation);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};

export const invitationList = (req, res) => {
    const { id } = req.tokenData;

    getInvitationList(id)
    .then(invitations => {
        res.formatResponse(invitations);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};

export const respondToAnInvitation = (req, res) => {
    const { id: userId } = req.tokenData;
    const { id } = req.params;
    const { answer, planId } = req.body;

    answerInvitation(id, answer, userId, planId)
    .then(response => {
        res.formatResponse(response);
    })
    .catch(err => {
        res.formatResponse(err.message, 401);
    });
};
