import { sendMail, sendInvite } from 'services/mail/mail.service';
import { welcomeTemplate } from 'templates/welcome';

export const sendWelcomeMail = req => {
    const { receiver } = req.body;
    const subject = 'Welcome to use Intercom';

    sendMail(receiver, welcomeTemplate, subject);
};

export const inviteUser = (req, res) => {
    const { id } = req.tokenData;
    const { receiver } = req.body;

    sendInvite(id, receiver)
    .then(() => res.formatResponse({}));
};

