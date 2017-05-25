/*
 * @Author: Pawn.Hu 
 * @Date: 2017-03-20 10:33:36 
 * @Last Modified by: Pawn.Hu
 * @Last Modified time: 2017-04-19 12:42:55
 */

import mongoose from 'mongoose';
import mongoDb from './db.js';

var Student = new mongoose.Schema({
    name: String,
    password: String,
    birthday: String,
    gender: String,
    email: String,
    phone: String,
    // 学院
    collage: String,
    // 专业
    speciality: String,
    //  最高学历
    highest: String,
    skills: [String],
    prize: [{ content: String, time: String }], // include string and date Schema.Types.Mixed
    eduction: [{ content: String, start: String, end: String }],
    pratice: [{ content: String, start: String, end: String, mainwork: String }],  // include company startdate, endDate, main work.
    introduction: String,
    resumePath: String,
    //  private 
    resumeDelivered: [{ email: String, position: String, time: Date }],  // the companies has delivered resume, include company ,job
    getInvations: [{ company: String, position: String, time: Date }],    // the companies which student has get invations from , include company ,job
    message: [{ content: String, time: Date, hasread: Boolean }],        // content date hasRead 
    comments: [{ content: String, time: Date, company: "" }]
})

export default mongoDb.model('student', Student);

            // skills: body.skills,
            // prize: body.prize,
            // pratice: body.pratice,
            // eduction: body.eduction,