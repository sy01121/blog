/**
 * Created by pc on 2017/2/24.
 */
// 先加载数据库模型进来
var ModelUser = require('../model/user');
module.exports = function (app) {
    // 指定首页路由
    // req-require请求；res-response响应
    // get 获取；set 设置
    app.get('/',function (req,res,next) {
       // res.send('这是我导出去的');
        res.render('index', { title: '首页' });
    });
    // 指定其他页面路由
    app.get('/login',function (req,res,next) {
        // res.send('登录');
        res.render('login',{title:'登录'});
    });
    app.get('/reg',function (req,res,next) {
        // res.send('注册');
        res.render('reg',{title:'注册'});
    });
    // 点击“注册”按钮后执行
    app.post('/reg',function (req,res,next) {
        var postData = {
            name:req.body.name,
            password:req.body.password
        };
        // Model提供了一个create方法来对数据进行保存
        ModelUser.create(postData,function (err,data) {
            if(err){
                console.log(err);
            }
            res.send(data);
        });
        // console.log(req.body);
        // res.send('注册成功');
    });
    app.get('/logout',function (req,res,next) {
        // res.send('退出');
        res.render('logout',{title:'退出'});
    });
};
