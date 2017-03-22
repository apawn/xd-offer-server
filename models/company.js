/*
 * @Author: Pawn.Hu 
 * @Date: 2017-03-20 14:13:46 
 * @Last Modified by: Pawn.Hu
 * @Last Modified time: 2017-03-21 16:20:00
 */

import mongoose from 'mongoose';
import mongoDb from './db.js';

var Company = new mongoose.Schema({
    name: String,        // 公司吗
    password: String,    // 密码
    email: String,       // 邮箱
    phone: String,      // 电话
    location: [String],  // 单位所在地
    number: Number,      // 招聘人数
    position: [{ name: String, job: String, salary: String }],  // 岗位,职责&要求  薪水
    invitation: [{ student: String, position: String, time: Date }],    //  发出的邀请
    received: [{ student: String, position: String, time: Date }],     // 接受到的邀请
    message: [{ Content: String, time: Date, hasread: Boolean }]    //  content ,date ,has read

})

export default mongoDb.model('company', Company);


