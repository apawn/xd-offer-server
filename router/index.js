/*
 * @Author: Pawn.Hu 
 * @Date: 2017-03-21 16:21:42 
 * @Last Modified by: Pawn.Hu
 * @Last Modified time: 2017-03-23 17:59:23
 */
import express from 'express';
import { signIn, signUp, signOut, getCurrentPage, getCompaniesCount } from './router.js';
var router = express.Router();


router.post('/api/login', signIn)
router.post('/api/signOut', (res, req) => {

})
router.get('/api/getCurrentPage', getCurrentPage);
router.get('/api/getCompaniesCount', getCompaniesCount);
export default router;