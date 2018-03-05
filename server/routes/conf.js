//获取需要的部件
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Conf = require('../models/conf');
var fs = require('fs');

function getWrong(res, err) {
	return res.json({
		status: 1,
		msg: err.message,
		result: ''
	})
}

function getRight(res, doc) {
	return res.json({
		status: 0,
		msg: "",
		result: doc
	})
}

//获取职位类型接口
router.get('/jobType',(req,res,next)=>{
	Conf.findOne({},(err,doc)=>{
		if (err) {
			getWrong(res,err);
		}else{
			getRight(res,doc);
		}
	})
})

// //获取筛选条件接口
// router.get('/filter',(req,res,next)=>{
// 	Conf.findOne({},(err,doc)=>{
// 		if (err) {
// 			getWrong(res,err);
// 		}else{
// 			console.log(doc);
// 			getRight(res,doc.filterExport);
// 		}
// 	})
// })

//删除banner图片
router.post('/delBannerImg',(req,res,next)=>{
	let imgName = req.body.imgName;
	Conf.update({
		'_id': '5a1538b9d1c84167f6d1fb8c'
	},{
		'$pull':{
			[`bannerImg`]: {
				[`imgName`]:imgName
			}
		}
	},(err,doc)=>{
		if(err){
			getWrong(res,err);
		}else{
			fs.unlink('./../gp/static/banner/' + imgName, (err1) => {
				if(err) {
					getWrong(err1)
				} else {
					res.json({
						status: 0,
						msg: 'Suc',
						result: req.file,
					});
				}
			});
		}
	})
})



//暴露结果
module.exports = router;