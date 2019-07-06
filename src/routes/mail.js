import express from 'express';
import { body } from 'express-validator';
import {
    sendWelcomeMail, inviteUser
} from 'controllers/mail.controller';
import { catchValidationError } from 'utils/validation';

const mail = express.Router();

mail.post('/welcome', [
    body('receiver').isEmail()
], catchValidationError, sendWelcomeMail);

mail.post('/invite', [
    body('receiver').isEmail()
], catchValidationError, inviteUser);

module.exports = mail;
