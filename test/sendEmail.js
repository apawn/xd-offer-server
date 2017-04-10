var nodemailer = require("nodemailer");
var emailConfig = {
    service: '126',
    user: 'mymeat@126.com',
    password: 'wode123shou'
}

let transporter = nodemailer.createTransport({
    service: emailConfig.service,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.password
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: 'mymeat@126.com', // sender address
    to: '812647756@qq.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});