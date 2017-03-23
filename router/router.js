/*
 * @Author: Pawn.Hu 
 * @Date: 2017-03-21 16:21:45 
 * @Last Modified by: Pawn.Hu
 * @Last Modified time: 2017-03-23 18:11:12
 */
import Student from '../models/student.js'
import Company from '../models/company.js'

import Official from '../models/official.js'

export var signIn = function (req, res, next) {
    var email = req.body.email,
        password = req.body.password;

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
};

// 注册,这个最难搞 !!!
export var signUp = function (req, res, next) { };
export var signOut = function (req, res, next) {
    req.session.user = null;
};

export var getCompaniesCount = (req, res, next) => {
    var count = Company.count().then(count => {
        res.json({ count });
    }).catch(err => {
        res.json({ count: 0 });
    });
};

export var getCurrentPage = (req, res, next) => {
    var page = req.query.page - 0,
        onePageCount = 7;
    if (page < 1) {
        page = 1;
    }

    Company.find({}).skip(onePageCount * (page - 1)).limit(onePageCount).then(docs => {
        console.log(docs);
        res.json(docs);
    }).catch(err => {
        res.json(null);
    });

};

// 投递简历   这里需要引入 socket.io
export var delivery = (req, res, next) => {
    var companyEmail = req.body.companyEmail,
        user = req.session.user;
    Company.findOne({ email: companyEmail }).then(doc => {
        // 得到这个公司
        // doc.update();
    }).catch(err => {

    });
};

export var invite = (req, res, next) => {
    var company = req.session.company,
        studentEmail = req.body.email;

    Student.find({ email: studentEmail }).then(doc => {
        //doc
        // doc.update();...
    }).catch(err => {

    })
}




// new mongoose.Schema({
//     name: String,        // 公司名
//     desc: String,
//     password: String,    // 密码
//     path: String,         // 招聘简章路径
//     email: String,       // 邮箱
//     phone: String,      // 电话
//     location: [String],  // 工作地点
//     number: Number,      // 招聘人数
//     position: [{ name: String, job: String, salary: String }],  // 岗位,职责&要求  薪水
//     invitation: [{ student: String, position: String, time: Date }],    //  发出的邀请
//     received: [{ student: String, position: String, time: Date }],     // 接受到的邀请
//     message: [{ Content: String, time: Date, hasread: Boolean }],   //  content ,date ,has read
//     comments: [{ content: String, time: Date, author: String }]
// })



// new mongoose.Schema({
//     name: String,
//     password: String,
//     birthday: Date,
//     gender: Number,
//     email: String,
//     phone: String,
//     speciality: String,
//     skill: [String],
//     prizes: [{ content: String, time: Date }], // include string and date Schema.Types.Mixed
//     experience: [{ content: String, start: Date, end: Date, mainwork: String }],  // include company startdate, endDate, main work.
//     introduction: String,
//     resumePath: String,
//     //  private 
//     resumeDelivered: [{ name: String, position: String, time: Date }],  // the companies has delivered resume, include company ,job
//     getInvations: [{ company: String, position: String, time: Date }],    // the companies which student has get invations from , include company ,job
//     message: [{ content: String, time: Date, hasread: Boolean }],        // content date hasRead 
//     comments: [{ content: String, time: Date, company: "" }]
// })