/*
 * @Author: Pawn.Hu 
 * @Date: 2017-03-21 16:21:42 
 * @Last Modified by: Pawn.Hu
 * @Last Modified time: 2017-05-26 12:51:00
 */
import express from 'express';
import {
    signIn, signUp, signOut, getCurrentPage, getCompaniesCount, getCurrentCompanyDetail, commentCompany
    , delivery, getVertifyCode, completeBasicInfo, completeKeyInfo, getAllNews, addNews, removeNews, updateNews,
    removeStudent, removeCompany, getStudentCount, getCurrentPageStudent
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

export default router;