import express from 'express';
import { PersistInvitation, invitationList, respondToAnInvitation } from 'controllers/invitation.controller';
import { body, param } from 'express-validator';
import { catchValidationError } from 'utils/validation';

const invitation = express.Router();

invitation.get('', invitationList);

invitation.post('', [
    body('plan').exists(),
    body('requested').exists(),
], catchValidationError, PersistInvitation);

invitation.put('/:id', [
    body('answer').exists(),
    param('id').exists(),
], catchValidationError, respondToAnInvitation);

module.exports = invitation;
