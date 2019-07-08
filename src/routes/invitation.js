import express from 'express';
import { PersistInvitation } from 'controllers/invitation.controller';
import { body } from 'express-validator';
import { catchValidationError } from 'utils/validation';

const invitation = express.Router();

invitation.post('', [
    body('plan').exists(),
    body('requested').exists(),
], catchValidationError, PersistInvitation);

module.exports = invitation;
