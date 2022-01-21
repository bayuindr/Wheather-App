const nodemailer = require('nodemailer')

function sendMail(email, subject, message){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'footwear1306@gmail.com',
            pass: 'lorduta2207' // naturally, replace both with your real credentials or an application-specific password
        }
    });
    const mailOptions = {
        from: 'footwear1306@gmail.com',
        to: `${email}`,
        subject: `${subject}`,
        text: `${message}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = sendMail