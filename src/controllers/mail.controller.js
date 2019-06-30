import { validationResult } from 'express-validator';
import { sendMail } from 'services/mail/mail.service';
import welcomeTemplate from 'templates/welcome';

exports.sendWelcomeMail = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.formatResponse({ ...errors.array()[0] }, 401);
    }
    const { receiver } = req.body;
    const subject = 'Welcome to use Intercom';

    sendMail(receiver, welcomeTemplate, subject);
};

