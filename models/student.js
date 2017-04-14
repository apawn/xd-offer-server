/*
 * @Author: Pawn.Hu 
 * @Date: 2017-03-20 10:33:36 
 * @Last Modified by: Pawn.Hu
 * @Last Modified time: 2017-04-14 12:04:13
 */

import mongoose from 'mongoose';
import mongoDb from './db.js';

var Student = new mongoose.Schema({
    name: String,
    password: String,
    birthday: Date,
    gender: Number,
    email: String,
    phone: String,
    // 学院
    college: String,
    // 专业
    speciality: String,
    skill: [String],
    prizes: [{ content: String, time: Date }], // include string and date Schema.Types.Mixed
    experience: [{ content: String, start: Date, end: Date, mainwork: String }],  // include company startdate, endDate, main work.
    introduction: String,
    resumePath: String,
    //  private 
    resumeDelivered: [{ email: String, position: String, time: Date }],  // the companies has delivered resume, include company ,job
    getInvations: [{ company: String, position: String, time: Date }],    // the companies which student has get invations from , include company ,job
    message: [{ content: String, time: Date, hasread: Boolean }],        // content date hasRead 
    comments: [{ content: String, time: Date, company: "" }]
})

export default mongoDb.model('student', Student);

