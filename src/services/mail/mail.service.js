import nodemailer from 'nodemailer';
import config from 'config';
import UserModel from 'models/user.model';
import { getInviteMarkup } from 'templates/welcome';

export const sendMail = (receiver, markup, subject) => {
    const transporter = nodemailer.createTransport({
        ...config.mail
    });
      
    const mailOptions = {
        from: config.mail.sender,
        to: receiver,
        subject,
        html: markup
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) console.log(err.message);
        
        console.log('Email sent: ' + info.response);
    });
};

export const sendInvite = (sender, receiver) => {
    return UserModel.findById(sender)
    .then(user => {
        sendMail(receiver, getInviteMarkup(user), `${user.name} invites you to join intercom`);
    });
};