//获取需要的部件
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Admin = require('../models/admin');

//链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/graduationProject');

mongoose.connection.on("connected", function () {
	  console.log("MongoDB connected success.")
	});

	mongoose.connection.on("error", function () {
	  console.log("MongoDB connected fail.")
	});

	mongoose.connection.on("disconnected", function () {
	  console.log("MongoDB connected disconnected.")
	});
	
//获取路由	
router.get('/',function(req,res,next){
	Admin.find({},function(err,doc){
		if(err){
			res.json({
				status:1,
				msg:err.message
			});
		}else{
			res.json({
				status:0,
				msg:'',
				result:{
					count:doc.length,
					list:doc
				}
			})
		}
	})
});

//注册管理员
router.post('/createAdmin',function (req,res,next) {
	let param = {
		fullAuthority:req.body.fullAuthority,
		userId:10011,
		userType:req.body.userType
	}
	Admin.create(param,function (err,doc) {
		if (err) {
			res.json({
				status:1,
				msg:err.message,
				result:''
			})
		}else{
			res.json({
				status:0,
				msg:'',
				result:''
			})
		}
	})
});
//暴露结果
module.exports = router;

