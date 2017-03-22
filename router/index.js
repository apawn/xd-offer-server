/*
 * @Author: Pawn.Hu 
 * @Date: 2017-03-21 16:21:42 
 * @Last Modified by: Pawn.Hu
 * @Last Modified time: 2017-03-22 12:02:04
 */
import express from 'express';
import { signIn, signUp, signOut } from './router.js';
var router = express.Router();


router.post('/api/login', signIn)
router.get('/api/signOut', (res, req) => {

})
export default router;