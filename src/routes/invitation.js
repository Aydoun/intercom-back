import express from 'express';
import { PersistInvitation, invitationList, respondToAnInvitation } from 'controllers/invitation.controller';
import { body, param, check } from 'express-validator';
import { catchValidationError } from 'utils/validation';

const invitation = express.Router();

invitation.get('', invitationList);

invitation.post('', [
    body('planId').exists(),
    body('requested').exists(),
], catchValidationError, PersistInvitation);

invitation.put('/:id', [
    check('answer').exists(),
    check('planId').isMongoId(),
    param('id').exists(),
], catchValidationError, respondToAnInvitation);

module.exports = invitation;
