/*
 * @Author: Pawn.Hu 
 * @Date: 2017-03-20 11:18:02 
 * @Last Modified by: Pawn.Hu
 * @Last Modified time: 2017-03-20 18:28:28
 */

import mongoose from 'mongoose';
import {dbUrl} from '../config.js'
mongoose.Promise = global.Promise



mongoose.connect(dbUrl).then(function(res){
    console.log("数据库连接成功");
}).catch(function(err){
    console.log("数据库连接失败,请检查 21017 端口");
})
var mongoDb = mongoose.connection;
mongoDb.once('open',function(res){
    console.log("数据库连接成功");
})

export default mongoDb;