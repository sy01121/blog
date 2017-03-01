/**
 * Created by suny on 2017/3/1.
 */
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name:String, // 昵称
    password:String  // 密码
});
module.exports = mongoose.model('user',userSchema);
