//获取需要的文件
'use strict';
var express = require('express');
const md5 = require('md5');
var router = express.Router();
var User = require('../models/user');
var Apply = require('../models/apply');
var Company = require('../models/company');
var hello = require('./../util/createUserId.js');
require('./../util/util');

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
		msg: '',
		result: doc
	})
}

//用户登录
router.post('/login', function(req, res, next) {
	let param = {
		userName: req.body.userName,
		userPwd: md5(req.body.userPwd)
	}
	User.findOne(param, function(err, doc) {
		if(err) {
			res.json({
				status: 1,
				msg: err.message
			});
		} else {
			if(doc) {
				let userType = doc.userType;
				if(userType == 3) {
					if(doc.isWaitting == true) {
						res.json({
							status: 2,
							msg: '当前用户正在审核',
							result: ''
						})
					} else {
						console.log(doc.isPass);
						if(doc.isPass == false) {
							res.json({
								status: 3,
								msg: '当前用户未通过审核，请重新申请',
								result: doc.userName
							})
						} else {
							res.cookie('userId', doc.userId, {
								path: '/',
								maxAge: 1000 * 60 * 60 * 10
							});
							res.cookie('userName', doc.userName, {
								path: '/',
								maxAge: 1000 * 60 * 60 * 10
							});
							res.cookie('userType', doc.userType, {
								path: '/',
								maxAge: 1000 * 60 * 60 * 10
							});
							res.json({
								status: 0,
								msg: '',
								result: {
									userName: doc.userName,
									userType: doc.userType
								}
							})
						}
					}
				} else {
					res.cookie('userId', doc.userId, {
						path: '/',
						maxAge: 1000 * 60 * 60 * 10
					});
					res.cookie('userName', doc.userName, {
						path: '/',
						maxAge: 1000 * 60 * 60 * 10
					});
					res.cookie('userType', doc.userType, {
						path: '/',
						maxAge: 1000 * 60 * 60 * 10
					});
					res.json({
						status: 0,
						msg: '',
						result: {
							userName: doc.userName,
							userType: doc.userType
						}
					})
				}
			} else {
				res.json({
					status: 1,
					msg: '用户名密码错误',
					result: ''
				})
			}
		}
	})
})

//登出功能
router.post('/logout', function(req, res, next) {
	res.cookie('userId', '', {
		path: '/',
		maxAge: -1
	});
	res.cookie('userName', '', {
		path: '/',
		maxAge: -1
	});
	res.cookie('userType', '', {
		path: '/',
		maxAge: -1
	});
	res.json({
		status: 0,
		msg: '',
		result: ''
	})
})

//检查是否登录
router.get('/checkLogin', function(req, res, next) {
	if(req.cookies.userId) {
		res.json({
			status: 0,
			msg: '',
			result: ({
				userName: req.cookies.userName,
				userType: req.cookies.userType
			})
		})
	} else {
		res.json({
			status: 1,
			msg: '当前未登录',
			result: ''
		})
	}
})

//用户名查询
router.post('/userName', function(req, res, next) {
	let param = {
		userName: req.body.userName,
		isWaitting: false,
		isPass: true
	}
	User.find(param, function(err, doc) {
		if(err) {
			getWrong(res,err)
		} else {
			getRight(res,doc)
		}
	})
})

//用户id查询
router.post('/userId', function(req, res, next) {
	let param = {
		userId: req.body.userId,
		isWaitting: false,
		isPass: true
	}
	User.find(param, function(err, doc) {
		if(err) {
			res.json({
				status: 1,
				msg: err.message,
				result: ''
			})
		} else {
			res.json({
				status: 0,
				msg: '',
				result: doc
			})
		}
	})
})

//管理员注册
router.post('/createUser', function(req, res, next) {
	let param = {
		userName: req.body.adminName,
		userPwd: md5(req.body.adminPwd),
		userType: 1,
		userId: 10011
	};
	let userName = req.body.adminName;
	User.find({
		'userName': userName
	}, function(err, doc) {
		if(err) {
			res.json({
				status: 1,
				msg: err.message,
				result: ''
			})
		} else {
			if(doc.length > 0) {
				res.json({
					status: 10001,
					msg: '用户已存在',
					result: ''
				});
				console.log(doc);
			} else {
				User.create(param, function(err, doc) {
					if(err) {
						res.json({
							status: 1
						})
					} else {
						res.json({
							status: 10003
						})
					}
				})
			}
		}
	})
})

//管理员通过企业申请
router.post('/pass', (req, res, next) => {
	let userName = req.body.userName;
	User.findOne({}).sort({
		'userId': -1
	}).limit(1).exec((err, doc) => {
		if(err) {
			getWrong(res, err);
		} else {
			if(doc) {
				let maxDate = parseInt(doc.userId);
				let userId = hello.createUserId(maxDate, 3);
				//修改用户表内容
				User.update({
					'userName': userName
				}, {
					'isWaitting': false,
					'userId': userId,
					'isPass': true
				}, (err1, doc1) => {
					if(err) {
						getWrong(res, err1);
					} else {
						//修改申请表内容
						Apply.update({
							'userName': userName
						}, {
							'isChecked': true
						}, (err2, doc2) => {
							if(err) {
								getWrong(res, err2);
							} else {
								//插入company表
								let regeditInfo = {};
								Apply.findOne({
									'userName': userName
								}, (err3, doc3) => {
									if(err3) {
										getWrong(res, err3);
									} else {
										console.log('申请表信息：' + doc3);
										regeditInfo = doc3;
										console.log('赋值申请表信息被' + regeditInfo);
										Company.create({
											'userId': userId,
											'userName': regeditInfo.userName,
											'userPwd': regeditInfo.userPwd,
											'userType': 3,
											'regeditInfo': {
												'hrName': regeditInfo.hrName,
												'hrTel': regeditInfo.hrTel,
												'hrEmail': regeditInfo.hrEmail,
												'companyName': regeditInfo.companyName,
												'compnayLisence': regeditInfo.compnayLisence
											},
											'companyInfo': {
												'companyLogo': '',
												'companyBaseInfo': {
													'companyType': '',
													'companyCount': '',
													'companyHref': '',
													'companyProvince':'',
													'companyCity':'',
													'companyArea':''
												},
												'companyIntroduce': '',
												'companyLabel': ''
											},
											'companyProduction': [],
											'received': [],
											'interview': []
										}, (err4, doc4) => {
											if(err4) {
												getWrong(res, err4);
											} else {
												getRight(res, doc4);
											}
										})
									}
								});
							}
						})
					}
				});
			}
		}
	})
})

//管理员拒绝企业申请
router.post('/dispass', (req, res, next) => {
	let userName = req.body.userName;
	User.update({
		'userName': userName
	}, {
		'isWaitting': false,
		'isPass': false
	}, (err, doc) => {
		if(err) {
			getWrong(res, err);
		} else {
			//修改申请表内容
			Apply.update({
				'userName': userName
			}, {
				'isChecked': true
			}, (err2, doc2) => {
				if(err) {
					getWrong(res, err2);
				} else {
					getRight(res, doc2);
				}
			})
		}
	})
})

//企业确认被拒绝
router.post('/clearUserInfo', (req, res, next) => {
	let userName = req.body.userName;
	User.remove({
		'userName': userName
	}, (err, doc) => {
		if(err) {
			getWrong(res, err);
		} else {
			Apply.remove({
				'userName': userName
			}, (err1, doc1) => {
				if(err) {
					getWrong(res, err);
				} else {
					getRight(res, doc);
				}
			})
		}
	})
})


//用户修改密码
router.post('/changePassword',(req,res,next)=>{
	let userId = req.body.userId;
	let oldPws = req.body.oldPassword;
	let newPwd = md5(req.body.newPassword);
	User.findOne({
		'userId':userId
	},(err,doc)=>{
		if (err) {
			getWrong(res,err);
		}else{
			if (doc.userPwd == oldPws) {
					User.update({
						'userId': userId
					}, {
						'userPwd': newPwd
					}, (err, doc) => {
						if (err) {
							getWrong(res,err);
						}else{
							getRight(res,doc);
						}
					})
			}else{
				res.json({
					status:1001,
					msg:'用户旧密码不正确',
					result:''
				})
			}
		}
	})

})


module.exports = router;