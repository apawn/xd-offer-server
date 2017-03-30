/*
 * @Author: Pawn.Hu 
 * @Date: 2017-03-20 14:13:46 
 * @Last Modified by: Pawn.Hu
 * @Last Modified time: 2017-03-30 17:48:10
 */

import mongoose from 'mongoose';
import mongoDb from './db.js';

var Company = new mongoose.Schema({
    name: String,        // 公司名
    desc: String,
    password: String,    // 密码
    path: String,         // 招聘简章路径
    email: String,       // 邮箱
    phone: String,      // 电话
    location: [String],  // 工作地点
    number: Number,      // 招聘人数
    position: [{ name: String, job: String, salary: String, received: [{ studentEmail: String, time: String }] }],  // 岗位,职责&要求  薪水 接受到的邀请
    invitation: [{ student: String, position: String, time: String }],    //  发出的邀请
    message: [{ Content: String, time: Date, hasread: Boolean }],   //  content ,date ,has read
    comments: [{ content: String, time: String }]
})

// 这里真是一个大坑, 如果是自己建的数据库, 一定要写第三个参数,否则 mongoose会自动在第一个参数后面加 s 作为数据库名.
export default mongoDb.model('company', Company, 'company');

