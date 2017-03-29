/*
 * @Author: Pawn.Hu 
 * @Date: 2017-03-21 16:21:42 
 * @Last Modified by: Pawn.Hu
 * @Last Modified time: 2017-03-28 23:50:57
 */
import express from 'express';
import { signIn, signUp, signOut, getCurrentPage, getCompaniesCount, getCurrentCompanyDetail, commentCompany } from './router.js';
var router = express.Router();


router.post('/api/login', signIn)
router.post('/api/signOut', (res, req) => {

})
router.post('/api/getCurrentPage', getCurrentPage);
router.post('/api/getCompaniesCount', getCompaniesCount);
router.post('/api/companydetail', getCurrentCompanyDetail);
router.post('/api/commentcompany', commentCompany);
export default router;