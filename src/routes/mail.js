import express from 'express';
import { body } from 'express-validator';
import {
    sendWelcomeMail
} from 'controllers/mail.controller';

const mail = express.Router();

mail.post('/welcome', [
    body('receiver').isEmail()
], sendWelcomeMail);

module.exports = mail;
