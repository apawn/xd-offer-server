/*
 * @Author: Pawn.Hu 
 * @Date: 2017-03-20 14:13:46 
 * @Last Modified by: Pawn.Hu
 * @Last Modified time: 2017-05-26 11:47:09
 */

import mongoose from 'mongoose';
import mongoDb from './db.js';

var Company = new mongoose.Schema({
    id: String,
    header: String,
    content: String,
    time: String

})

// 这里真是一个大坑, 如果是自己建的数据库, 一定要写第三个参数,否则 mongoose会自动在第一个参数后面加 s 作为数据库名.
export default mongoDb.model('news', Company, 'news');

