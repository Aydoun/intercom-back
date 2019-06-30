import nodemailer from 'nodemailer';
import config from 'config';

exports.sendMail = (receiver, markup, subject) => {
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