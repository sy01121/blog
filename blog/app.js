var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// 加载安装的express-session、connect-mongo、mongoose三个模块
var mongoose = require('mongoose');
var session = require('express-session');
// 将上面session作为参数传入
var MongoStore = require('connect-mongo')(session);

// ./ 返回与app.js同一级的文件
var routes = require('./config/routes');
var test = require('./config/test');


// default
// var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// 链接数据库
mongoose.connect('mongodb://localhost/blog');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.set('view engine','htm');
app.engine('.htm',require('ejs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 设置session
app.use(session({
    secret:'123456',
    // 利用构造函数 var MongoStore = require('connect-mongo')(session);
    store: new MongoStore({
        // 需要加密的字符串
        cookieSecret:'qwertyuiopasdfghjklzcxvcb',
        // 与数据库地址一致
        //db:'blog',
        url: 'mongodb://localhost/blog',
        // 本地地址
        host:'localhost'

    })
}));

// default
// app.use('/', index);
// app.use('/users', users);
routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
