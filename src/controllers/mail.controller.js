import { sendMail, sendInvite } from 'services/mail/mail.service';
import { welcomeTemplate } from 'templates/welcome';

exports.sendWelcomeMail = req => {
    const { receiver } = req.body;
    const subject = 'Welcome to use Intercom';

    sendMail(receiver, welcomeTemplate, subject);
};

exports.inviteUser = (req, res) => {
    const { id } = req.tokenData;
    const { receiver } = req.body;

    sendInvite(id, receiver)
    .then(() => res.formatResponse({}));
};

