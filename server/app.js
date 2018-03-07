var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var admin = require('./routes/admin'); 
var job = require('./routes/job'); 
var company = require('./routes/company');
var user = require('./routes/user');
var apply = require('./routes/apply');
var student = require('./routes/student');
var upload = require('./routes/upload');
var conf = require('./routes/conf');
var exporter = require('./routes/export');
var test = require('./routes/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(function (req,res,nextr) {
//	if (req.cookies.userId && req.cookies.userName && req.cookies.userType) {
//		next();
//	} else{
//		if (req.originalUrl=='/user/login' || req.originalUrl=='/user/logout' ) {
//			next();
//		}else{
//			res.json({
//				status:10001,
//				msg:'当前未登陆',
//				result:''
//			})
//		}
//	}
//})

app.use('/', index);
app.use('/admin', admin);
app.use('/job', job);
app.use('/company',company);
app.use('/user',user);
app.use('/apply',apply);
app.use('/student',student);
app.use('/upload', upload);
app.use('/conf',conf);
app.use('/export',exporter);
app.use('/test',test);


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
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
