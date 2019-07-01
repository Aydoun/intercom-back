import { sendMail } from 'services/mail/mail.service';
import welcomeTemplate from 'templates/welcome';

exports.sendWelcomeMail = req => {
    const { receiver } = req.body;
    const subject = 'Welcome to use Intercom';

    sendMail(receiver, welcomeTemplate, subject);
};

