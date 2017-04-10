/*
 * @Author: Pawn.Hu 
 * @Date: 2017-04-09 16:07:49 
 * @Last Modified by: Pawn.Hu
 * @Last Modified time: 2017-04-09 21:15:58
 */
import nodemailer from 'nodemailer';
import { emailConfig } from '../config'

export const sendmaile = (vertifyCode, receiver) => {

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
        to: receiver, // list of receivers
        subject: 'xd-offer 注册验证码', // Subject line
        html: `<p>您好，您注册西电offer 的验证码是 <strong>${vertifyCode}</strong></p>`, // plain text body
    };

    // send mail with defined transport object
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions).then(info => {
            resolve(info);
        }).catch(err => {
            reject(err);
        })
    })
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Message %s sent: %s', info.messageId, info.response);
    // });
}