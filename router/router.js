/*
 * @Author: Pawn.Hu 
 * @Date: 2017-03-21 16:21:45 
 * @Last Modified by: Pawn.Hu
 * @Last Modified time: 2017-06-02 19:49:28
 */
import Student from '../models/student.js'
import Company from '../models/company.js'
import News from '../models/news.js'

import Official from '../models/official.js'
import sendmailer from '../tools/sendmail.js'
import dateFormat from 'dateformat';

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

// ------------管理员部分-------------------

export const removeCompany = (req, res, next) => {
    var email = req.body.email,
        name = req.body.name;
    console.log(name);
    console.log(email);

    Company.remove({ email: email, name: name }).then(doc => {
        res.json({ ok: 1 });
    }).catch(e => {
        res.json({ OK: 0 });
    })
}

export const getAllNews = (req, res, next) => {
    News.find({}).sort({ time: 1 }).then(docs => {
        res.json(docs)
    }).catch(e => {
        res.json([])
    })
}

export const addNews = (req, res, next) => {
    var news = req.body.news,
        now = new Date(),
        date = dateFormat(now, 'yyyy-mm-dd');
    News.insertMany([{
        time: date,
        id: news.id,
        header: news.header,
        content: news.content
    }]).then(docs => {
        res.json({ ok: 1 })
    }).catch(e => {
        res.json({ ok: 0 })
    })
}

export const removeNews = (req, res, next) => {
    var id = req.body.id;
    console.log(id);
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
        onePageCount = 7;

    if (page < 1) {
        page = 1;
    }
    Student.find({}).skip(onePageCount * (page - 1)).limit(onePageCount).then(docs => {
        res.json(docs);
    }).catch(err => {
        res.json(null);
    });
};


export const removeStudent = (req, res, next) => {
    var email = req.body.email;
    console.log(email);
    Student.remove({ email: email }).then(doc => {
        res.json({ ok: 1 });
    }).catch(e => {
        res.json({ OK: 0 });
    })
}

export const getStudentDetail = (req, res, next) => {
    var email = req.body.email;
    Student.findOne({ email: email }).then(doc => {
        res.json({ "student": doc })
    }).catch(e => {
        res.json(null)
    })
}

export const getInvitedStudents = (req, res, next) => {
    var companyEmail = req.body.email;
    // var companyEmail = 'test2@qq.com';
    Company.findOne({ email: companyEmail }).then(doc => {
        var invitedStudents = doc.invatation || [];
        // invitedStudents.map(item => { console.log(item.time) });
        Student.where('email').in(invitedStudents.map(item => item.email)).then(docs => {
            res.json(docs);
        }).catch(err => {
            res.json([]);
        })
    }).catch(err => {
        res.json([]);
    })
}

export const inviteStudent = (req, res, next) => {
    var studentEmail = req.body.studentEmail,
        companyEmail = req.body.companyEmail;

    Company.update({ email: companyEmail }, {
        $push: {
            "invatation": {
                email: studentEmail,
                time: new Date().toLocaleDateString()
            }
        }
    }).then(doc => {
        Student.update({ email: studentEmail }, {
            $push: {
                "getInvations": {
                    email: companyEmail,
                    time: new Date().toLocaleDateString()
                }
            }
        }).then(_doc => {
            console.log(_doc);
            res.json({
                ok: true
            })
        }).catch(err => {
            console.log(err);
            res.json({
                ok: false
            })
        })

    }).catch(err => {
        console.log(err);
        res.json({
            ok: false
        })
    })
}
export const getDeliveriedStudents = (req, res, next) => {
    var companyEmail = req.body.email;
    Company.findOne({ email: companyEmail }).then(doc => {
        var receivedStudents = doc.received;

        Student.where('email').in(receivedStudents.map(item => item.email)).then(docs => {
            res.json(docs);
        }).catch(err => {
            res.json([]);
        })
    }).catch(err => {
        res.json([]);
    })
}


export const companySignIn = (req, res, next) => {
    var name = req.body.email,
        pwd = req.body.password,
        result = {};
    console.log(name + "-----" + pwd);
    Company.findOne({
        password: pwd,
        email: name
    }).then(doc => {
        if (doc) {
            result.ok = true;
            result.result = doc;
        } else {
            result.ok = false;
            result.result = {};
        }
        res.json(result);
    }).catch(err => {
        res.json({ ok: false, result: {} })
    })
}


// 学生查看邀请 和 投递简历

export const studentGetInvitations = (req, res, next) => {
    var studentEmail = req.body.email;
    Student.findOne({ email: studentEmail }).then(doc => {
        if (doc) {
            var invations = doc.getInvations.map(item => item.email);
            Company.where('email').in(invations).then(docs => {
                res.json(docs);
            }).catch(err => {
                console.log(err);
                res.json(null);
            })
        }
    }).catch(err => {
        console.log(err);
        res.json(null);
    })
}

export const studentHasDeliveried = (req, res, next) => {
    var studentEmail = "test@qq.com";

    Student.findOne({ email: studentEmail }).then(doc => {
        if (doc) {
            var deliveried = doc.resumeDelivered.map(item => item.email);
            Company.where('email').in(deliveried).then(docs => {
                res.json(docs);
            }).catch(err => {
                console.log(err);
                res.json(null);
            })
        }
    }).catch(err => {
        console.log(err);
        res.json(null);
    })
}

export var delivery = (req, res, next) => {
    var studentEmail = req.body.studentEmail,
        companyEmail = req.body.companyemail,
        position = req.body.position;
    console.log(companyEmail);
    Student.update({ email: studentEmail }, {
        $push: {
            "resumeDelivered": {
                email: companyEmail,
                position: position,
                time: new Date().toLocaleDateString()
            }
        }
    }).then(result => {
        Company.update({ email: companyEmail }, {
            $push: {
                "received": {
                    email: studentEmail,
                    position: position,
                    time: new Date().toLocaleDateString()
                }
            }
        }).then(result => {
            res.json({ ok: true });
        }).catch(err => {
            console.log(err);
            res.json({ ok: false });
        })
    }).catch(err => {
        console.log(err);
        res.json({ ok: false });
    })
}    