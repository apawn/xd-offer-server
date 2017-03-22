/*
 * @Author: Pawn.Hu 
 * @Date: 2017-03-20 10:33:36 
 * @Last Modified by: Pawn.Hu
 * @Last Modified time: 2017-03-22 12:30:41
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
    speciality: String,
    skill: [String],
    prizes: [{ content: String, time: Date }], // include string and date Schema.Types.Mixed
    experience: [{ content: String, start: Date, end: Date, mainwork: String }],  // include company startdate, endDate, main work.
    introduction: String,
    resumePath: String,
    //  private 
    resumeDelivered: [{ name: String, position: String, time: Date }],  // the companies has delivered resume, include company ,job
    getInvations: [{ company: String, position: String, time: Date }],    // the companies which student has get invations from , include company ,job
    message: [{ content: String, time: Date, hasread: Boolean }],        // content date hasRead 


})

export default mongoDb.model('student', Student);

