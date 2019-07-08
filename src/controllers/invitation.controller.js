import { addInvitation } from 'services/invitation/invitation.service';

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
