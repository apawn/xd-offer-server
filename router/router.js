/*
 * @Author: Pawn.Hu 
 * @Date: 2017-03-21 16:21:45 
 * @Last Modified by: Pawn.Hu
 * @Last Modified time: 2017-05-26 12:49:33
 */
import Student from '../models/student.js'
import Company from '../models/company.js'
import News from '../models/news.js'

import Official from '../models/official.js'
import sendmailer from '../tools/sendmail.js'

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
    var page = req.body.page - 0,
        onePageCount = 7;

    if (page < 1) {
        page = 1;
    }
    Company.find({}).skip(onePageCount * (page - 1)).limit(onePageCount).then(docs => {
        res.json(docs);
    }).catch(err => {
        res.json(null);
    });

};

export var getCurrentCompanyDetail = (req, res, next) => {
    var name = req.body.name;
    Company.findOne({ name: name }).then(doc => {
        res.json(doc);
    }).catch(err => {
        res.json({});
    })
}

export var delivery = (req, res, next) => {
    var studentEmail = req.body.studentEmail,
        companyemail = req.body.companyemail,
        position = req.body.position;
    Company.findOne({ email: companyemail }).then(doc => {
        if (!doc) {
            res.json({})
        } else {
            var positions = doc.position;
            for (let i = 0, l = positions.length; i < l; i++) {
                if (positions[i].name === position) {
                    console.log(studentEmail)
                    doc.position[i].received.push({
                        "studentEmail": studentEmail,
                        "time": '5555'
                    })
                    doc.save().then(result => {
                        Student.update({ email: studentEmail }, {
                            $push: {
                                "resumeDelivered": {
                                    email: companyemail,
                                    position: position,
                                    time: new Date().toLocaleDateString()
                                }
                            }
                        }).then(result => {
                            res.json({
                                ok: true,
                                company: doc
                            })
                        })
                    }).catch(err => {
                        res.json({});
                    });
                    break;
                }
            }
        }
    }).catch(err => {
        res.json({})
    })
}

export var invite = (req, res, next) => {
    var company = req.session.company,
        studentEmail = req.body.email;

    Student.find({ email: studentEmail }).then(doc => {
        //doc
        // doc.update();...
    }).catch(err => {

    })
}


// 评价公司

export var commentCompany = (req, res, next) => {
    var email = req.body.companyemail,
        content = req.body.content;

    Company.update({ email: email }, {
        $push: {
            comments: { content: content, time: new Date().toLocaleDateString() }
        }
    }).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    })
}

export var getVertifyCode = (req, res, next) => {
    var email = req.body.email;
    var code = Math.random().toString().slice(-5);
    // 放入session中。
    req.session.vertifyCode = code;
    // var promise = sendmailer(code, email);

    // promise.then(info => {
    //     res.json({ ok: true })
    // }).catch(err => {
    //     res.json({ ok: false })
    // })
    console.log(req.session.vertifyCode);
    res.json({ ok: true });
}

export const signUp = (req, res, next) => {
    var name = req.body.name,
        email = req.body.email,
        password = req.body.password,
        vertifyCode = req.body.vertifyCode;
    console.log(req.session);
    console.log(vertifyCode);
    var sessionCode = req.session.vertifyCode;
    console.log(sessionCode);
    sessionCode = "11111"
    if (vertifyCode != sessionCode) {
        res.json({
            //  0 代表验证码不正确
            ok: 0
        })
    } else {
        Student.findOne({ email }).then(doc => {
            // 如果已经注册过
            if (doc) {
                res.json({
                    // 1 代表已经该邮箱已经注册过
                    ok: 1
                });
            } else {
                // 还没有注册，那么现在注册
                Student.insertMany([{
                    name: name, password: password, email: email
                }]).then(result => {
                    res.json({
                        // 2 代表注册成功 。
                        ok: 2
                    })
                }).catch(err => {
                    console.log(err);
                    res.json({
                        // 代表出错
                        ok: -1
                    })
                })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                // 代表出错
                ok: -1
            })
        })
    }
}


export const completeBasicInfo = (req, res, next) => {
    var body = req.body;
    Student.findOne({ email: body.email }).update({
        $set: {
            birthday: body.birthday,
            phone: body.phone,
            collage: body.collage,
            speciality: body.speciality,
            highest: body.highest,
            gender: body.gender,
            introduction: body.introduction,
            collage: body.collage
        }
    }, doc => {
        res.json({
            ok: true
        })
    })

}
export const completeKeyInfo = (req, res, next) => {
    var body = req.body;
    console.log(body);
    Student.findOne({ email: body.email }).update({
        $set: {
            skills: body.skills,
            prize: body.prize,
            pratice: body.pratice,
            eduction: body.eduction,
        }
    }, doc => {
        console.log(doc);
        res.json({
            ok: true
        })
    });

}

// 管理员部分
export const getAllNews = (req, res, next) => {
    News.find({}).then(docs => {
        res.json(docs)
    }).catch(e => {
        res.json([])
    })
}

export const addNews = (req, res, next) => {
    var news = req.body.news;
    News.insertMany([{
        id: news.id,
        header: news.header,
        content: news.content,
        time: news.time
    }]).then(docs => {
        res.json({ ok: 1 })
    }).catch(e => {
        res.json({ ok: 0 })
    })
}

export const removeNews = (req, res, next) => {
    var id = req.body.id;
    News.remove({ id: id }).then(docs => {
        res.json({ ok: 1 })
    }).catch(e => {
        res.json({ ok: 0 })
    })
}

export const updateNews = (req, res, next) => {
    var news = req.body.news;
    News.update({ id: news.id }, news).then(doc => {
        res.json({ ok: 1 });
    }).catch(e => {
        res.json({ OK: 0 });
    })
}

export const removeStudent = (req, res, next) => {
    var email = req.body.email,
        name = req.body.name;
    Student.remove({ email: email, name: name }).then(doc => {
        res.json({ ok: 1 });
    }).catch(e => {
        res.json({ OK: 0 });
    })
}

export const removeCompany = (req, res, next) => {
    var email = req.body.email,
        name = req.body.name;
    Company.remove({ email: email, name: name }).then(doc => {
        res.json({ ok: 1 });
    }).catch(e => {
        res.json({ OK: 0 });
    })
}








// 企业部分
// 得到学生个数
export var getStudentCount = (req, res, next) => {
    var count = Student.count().then(count => {
        res.json({ count });
    }).catch(err => {
        res.json({ count: 0 });
    });
};

export var getCurrentPageStudent = (req, res, next) => {
    var page = req.body.page - 0,
        onePageCount = 5;

    if (page < 1) {
        page = 1;
    }
    Student.find({}).skip(onePageCount * (page - 1)).limit(onePageCount).then(docs => {
        res.json(docs);
    }).catch(err => {
        res.json(null);
    });
};