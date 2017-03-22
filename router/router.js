/*
 * @Author: Pawn.Hu 
 * @Date: 2017-03-21 16:21:45 
 * @Last Modified by: Pawn.Hu
 * @Last Modified time: 2017-03-22 12:04:58
 */
import Student from '../models/student.js'
import Company from '../models/company.js'

import Official from '../models/official.js'

export var signIn = function (req, res, next) {
    var email = req.body.email,
        password = req.body.password;
    console.log(req.body);
    console.log(req.query);

    Student.findOne({ email, password }).
        then((doc) => {
            // 登录成功
            if (doc) {
                // 设置session
                req.session.user = doc;
                res.json({
                    ok: true,
                    session: doc
                })
            } else {
                // 登录失败
                req.session.user = null;
                res.json({
                    ok: false,
                    session: null,
                    message: '用户名或密码错误'
                })
            }
            // 登录失败
        }).
        catch((err) => {
            req.session.user = null;
            if (err) {
                res.json({
                    ok: false,
                    message: '未知失败'
                })
            }
        });
}


export var signUp = function (req, res, next) { }
export var signOut = function (req, res, next) {
    req.session.user = null;
}


























    // name:String,
    // password:String,
    // birthday:Date,
    // gender:Number,
    // email:String,
    // phone:String,
    // speciality:String,
    // skill:[String],
    // prizes:[{String,Date}], // include string and date Schema.Types.Mixed
    // experience:[{String,Date,Date,String}],  // include company startdate, endDate, main work.
    // introduction:String,
    // resumePath:String,
    // //  private 
    // resumeDelivered:[{String,String}] ,  // the companies has delivered resume, include company ,job
    // getInvations:[{String,String}]  ,    // the companies which student has get invations from , include company ,job
    // message:[{String,Date,Boolean}],        // content date hasRead 