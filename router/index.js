/*
 * @Author: Pawn.Hu 
 * @Date: 2017-03-21 16:21:42 
 * @Last Modified by: Pawn.Hu
 * @Last Modified time: 2017-06-02 16:14:09
 */
import express from 'express';
import {
    signIn, signUp, signOut, getCurrentPage, getCompaniesCount, getCurrentCompanyDetail, commentCompany
    , delivery, getVertifyCode, completeBasicInfo, completeKeyInfo, getAllNews, addNews, removeNews, updateNews, removeStudent, removeCompany, getStudentCount, getCurrentPageStudent, getStudentDetail,
    getDeliveriedStudents, getInvitedStudents, inviteStudent, companySignIn, studentHasDeliveried,
    studentGetInvitations
} from './router.js';
var router = express.Router();


router.post('/api/login', signIn)
router.post('/api/signOut', (res, req) => {

})
router.post('/api/getCurrentPage', getCurrentPage);
router.post('/api/getCompaniesCount', getCompaniesCount);
router.post('/api/companydetail', getCurrentCompanyDetail);
router.post('/api/commentcompany', commentCompany);
router.post('/api/delivery', delivery);
router.post('/api/getvertifycode', getVertifyCode);
router.post('/api/signup', signUp);
router.post('/api/completebasicinfo', completeBasicInfo);
router.post('/api/completekeyinfo', completeKeyInfo);
router.post('/api/getallnews', getAllNews);

// 管理员部分
router.post('/api/removecompany', removeCompany);
router.post('/api/removestudent', removeStudent);
router.post('/api/studentdetail', getStudentDetail);
router.post('/api/getstudentscount', getStudentCount);
router.post('/api/getcurrentstudentpage', getCurrentPageStudent);

router.post('/api/getallnews', getAllNews);
router.post('/api/removenews', removeNews);
router.post('/api/addnews', addNews);
router.post('/api/updatenews', updateNews);


// 公司部分

router.post('/api/getdeliveriedstudents', getDeliveriedStudents);
router.post('/api/getinvitedstudents', getInvitedStudents);
router.post('/api/invitestudent', inviteStudent);

router.post('/api/companylogin', companySignIn);


// 学生补充

router.post('/api/studentGetInvitations', studentGetInvitations);
router.post('/api/studentHasDeliveried', studentHasDeliveried);
export default router;






