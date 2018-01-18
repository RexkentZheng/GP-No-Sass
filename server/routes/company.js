//获取需要的文件
var express = require('express');
var router = express.Router();
var Company = require('../models/company');
var Student = require('../models/student');
var fs = require('fs');
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
		msg: "",
		result: doc
	})
}
//测试数据是否接收
router.get('/', function(req, res, next) {
	Company.find({}, function(err, doc) {
		if(err) {
			res.json({
				status: 1,
				msg: err.message
			});
		} else {
			res.json({
				status: 0,
				msg: '',
				result: {
					count: doc.length,
					list: doc
				}
			})
		}
	})
});

//获取公司的收件箱列表
router.post('/received', function(req, res, next) {
	let userId = parseInt(req.body.userId);
	Company.findOne({
		'userId': userId
	}, function(err, doc) {
		if(err) {
			getWrong(res, err);
		} else {
			//			if (doc) {
			//				let shit = [];
			//				console.log(doc.received[);
			//			}
			getRight(res, doc);
		}
	})
})

//获取公司信息
router.post('/companyDetails', function(req, res, next) {
	let userId = parseInt(req.body.userId);
	Company.findOne({
		'userId': userId
	}, function(err, doc) {
		if(err) {
			getWrong(res, err);
		} else {
			if(doc) {
				getRight(res, doc);
			} else {
				res.json({
					status: 1,
					msg: '没有这个用户',
					result: ''
				})
			}
		}
	})
})

//修改公司基本信息
router.post('/changeBaseInfo', (req, res, next) => {
	let userId = req.body.userId;
	let changeBaseInfo = req.body.companyBaseInfo;
	console.log(changeBaseInfo);
	Company.update({
		'userId': userId
	}, {
		'companyInfo.companyBaseInfo': changeBaseInfo
	}, (err, doc) => {
		if(err) {
			getWrong(res, err);
		} else {
			getRight(res, doc);
		}
	})
})

//修改公司标签
router.post('/changeLabel', (req, res, next) => {
	let userId = req.body.userId;
	let label = req.body.label;
	console.log(label);
	Company.update({
		'userId': userId
	}, {
		'companyInfo.companyLabel': label
	}, (err, doc) => {
		if(err) {
			getWrong(res, err);
		} else {
			getRight(res, doc);
		}
	})
})

//修改公司介绍
router.post('/changeIntroduce', (req, res, next) => {
	let userId = req.body.userId;
	let companyIntroduce = req.body.companyIntroduce;
	console.log(companyIntroduce);
	Company.update({
		'userId': userId
	}, {
		'companyInfo.companyIntroduce': companyIntroduce
	}, (err, doc) => {
		if(err) {
			getWrong(res, err);
		} else {
			getRight(res, doc);
		}
	})
})

//修改公司基本信息
router.post('/changeCompanyInfo', (req, res, next) => {
	let companyId = req.body.companyId;
	let filedName = req.body.filedName;
	let changeContent = req.body.changeContent;
	console.log(changeContent);
	Company.update({
		'userId': companyId
	}, {
		[`companyInfo.${filedName}`]: changeContent
	}, (err, doc) => {
		if(err) {
			getWrong(res, err);
		} else {
			getRight(res, doc);
		}
	})
});

//公司数组信息修改
router.post('/changeArrayInfo', (req, res, next) => {
	let companyId = req.body.companyId;
	let changeName = req.body.changeName;
	let changeId = req.body.changeId;
	let changeContent = req.body.changeContent;
	console.log(changeContent);
	if(changeContent.imgName) {
		let delImgh = changeContent.imgName;
		fs.unlink('./../gp/static/companyProduction/' + delImgh, function(err) {
			if(err) {
				return console.log(err);
				console.log('文件删除成功');
			} else {
				changeContent.imgName = '';
				Company.update({
					'userId': companyId,
					[`companyProduction.${changeName}`]: changeId
				}, {
					'$set': {
						[`companyProduction.$`]: changeContent
					}
				}, (err, doc) => {
					if(err) {
						getWrong(res, err);
					} else {
						getRight(res, err);
					}
				})
			}
		})
	} else {
		Company.update({
			'userId': companyId,
			[`companyProduction.${changeName}`]: changeId
		}, {
			'$set': {
				[`companyProduction.$`]: changeContent
			}
		}, (err, doc) => {
			if(err) {
				getWrong(res, err);
			} else {
				getRight(res, err);
			}
		})
	}
})

//公司数组信息添加
router.post('/addArrayInfo', (req, res, next) => {
	let companyId = req.body.companyId;
	let changeContent = req.body.changeContent;
	Company.update({
		'userId': companyId,
	}, {
		'$push': {
			'companyProduction': changeContent
		}
	}, (err, doc) => {
		if(err) {
			getWrong(res, err);
		} else {
			getRight(res, err);
		}
	})
})

//公司数组信息删除
router.post('/delArrayInfo', (req, res, next) => {
	let companyId = req.body.companyId;
	let id = req.body.id;
	Company.update({
		'userId': companyId,
	}, {
		'$pull': {
			companyProduction: {
				[`_id`]: id
			}
		}
	}, (err, doc) => {
		if(err) {
			getWrong(res, err);
		} else {
			getRight(res, err);
		}
	})
})

//学生投递简历
router.post('/addReceive', (req, res, next) => {
	let companyId = req.body.companyId;
	let param = {
		studentId: req.body.studentId,
		jobId: req.body.jobId,
		sendStatus: req.body.sendStatus,
		receivedTime: new Date().Format('yyyy-MM-dd')
	};
	let paramStudent = {
		companyId: req.body.companyId,
		sendStatus: '待沟通',
		jobId: req.body.jobId,
		sendDate: new Date().Format('yyyy-MM-dd')
	}
	console.log(param);
	Student.findOne({
		'userId': param.studentId
	}, (err, doc) => {
		let isFinish = true;
		console.log(doc)
		for(let key in doc.resumetInfo) {
			if(!doc.resumetInfo[key]) {
				isFinish = false;
			}
		}
		if(isFinish) {
			Company.find({
				'userId': companyId,
				'received.studentId': param.studentId,
				'received.jobId': param.jobId
			}, (err, doc) => {
				if(err) {
					getWrong(res, err);
				} else {
					console.log(doc.length);
					if(doc.length == 1) {
						res.json({
							status: 2,
							msg: '已投递',
							result: ''
						})
					} else {
						Company.update({
							'userId': companyId
						}, {
							'$push': {
								received: param
							}
						}, (err, doc) => {
							if(err) {
								getWrong(res, err);
							} else {
								Student.update({
									'userId': param.studentId
								}, {
									'$push': {
										sendInfo: paramStudent
									}
								}, (err, doc) => {
									if(err) {
										getWrong(res, err);
									} else {
										getRight(res, doc);
									}
								})
							}
						})
					}
				}
			})
		}else{
			res.json({
				status:1001,
				msg:'简历信息未完善',
				result:''
			})
		}
	})

})

//邀请面试接口
router.post('/saveInvitation', (req, res, next) => {
	let companyId = parseInt(req.body.companyId);
	let param = {
		interviewDist: req.body.interviewDist,
		interviewDate: req.body.interviewDate,
		interviewHalfday: req.body.interviewHalfday,
		interviewTime: req.body.interviewTime,
		studentId: req.body.studentId,
		jobId: req.body.jobId
	};
	Company.update({
		'userId': companyId
	}, {
		'$push': {
			interview: param
		}
	}, (err, doc) => {
		if(err) {
			getWrong(res, err);
		} else {
			Company.findOne({
				'userId': companyId
			}, (err, doc) => {
				if(err) {
					getWrong(res, err);
				} else {
					for(var i = 0; i < doc.received.length; i++) {
						if(doc.received[i].jobId == param.jobId && doc.received[i].studentId == param.studentId) {
							doc.received[i].sendStatus = '已邀请';
							doc.markModified('sendStatus');
							doc.save(function(err) {
								Student.update({
									'userId': param.studentId,
									'sendInfo.jobId': param.jobId,
									'sendInfo.companyId': companyId,
								}, {
									'$set': {
										'sendInfo.$.sendStatus': '邀请面试',
										'sendInfo.$.interviewDate': param.interviewDate,
										'sendInfo.$.interviewHalfday': param.interviewHalfday,
										'sendInfo.$.interviewTime': param.interviewTime,
										'sendInfo.$.interviewDist': param.interviewDist,
									}
								}, (err, doc) => {
									if(err) {
										getWrong(res, err);
									} else {
										getRight(res, doc);
									}
								})
								return;
							})
						}
					}
				}
			})

		}
	})
})

//拒绝接口

//老实说，这里有个BUG，具体的就看学生修改信息的方法，这个方法是用$set来修改内容的，可是在Company里用同样
//的方法不管用，实在是不知道为什么了，于是就用了个循环来判断下内容是不是一样，然后用save来保存修改的内容
router.post('/refuseInvitation', (req, res, next) => {
	let companyId = parseInt(req.body.companyId);
	let studentId = req.body.studentId;
	let jobId = req.body.jobId;
	let test = req.body.test;
	console.log(companyId);
	console.log(studentId);
	console.log(jobId);
	Company.findOne({
		'userId': companyId
	}, (err, doc) => {
		if(err) {
			getWrong(res, err);
		} else {
			for(var i = 0; i < doc.received.length; i++) {
				if(doc.received[i].jobId == jobId && doc.received[i].studentId == studentId) {
					doc.received[i].sendStatus = '已拒绝';
					doc.markModified('sendStatus');
					doc.save(function(err) {
						Student.update({
							'userId': studentId,
							'sendInfo.jobId': jobId,
							'sendInfo.companyId': companyId,
						}, {
							'$set': {
								'sendInfo.$.sendStatus': '不合适'
							}
						}, (err, doc) => {
							if(err) {
								getWrong(res, err);
							} else {
								getRight(res, doc);
							}
						})
						return;
					})
				}
			}
		}
	})

	//Company.update({
	//	'userId': companyId,
	//	'received.jobId': jobId,
	//	'received.studentId':studentId,
	//},{
	//	'$set':{
	//		'received.$.sendStatus': '123'
	//	}
	//},(err,doc)=>{
	//	if (err) {
	//		getWrong(res,err);
	//	}else{
	//		getRight(res,doc);
	//	}
	//})

	//	Company.update({
	//		'userId': companyId,
	//		'received.jobId': jobId,
	//		'received.studentId': studentId
	//	}, {
	//		'$set': {
	//			'received.$.sendStatus': '已拒绝'
	//		}
	//	}, (err, doc) => {
	//		if(err) {
	//			getWrong(res, err);
	//		} else {
	//			Student.update({
	//				'userId': studentId,
	//				'sendInfo.jobId': jobId
	//			}, {
	//				'$set': {
	//					'sendInfo.$.sendStatus': '已拒绝'
	//				}
	//			}, (err, doc) => {
	//				if(err) {
	//					getWrong(res, err);
	//				} else {
	//					getRight(res, err);
	//				}
	//			})
	//		}
	//	})

	//	Company.update({
	//		'userId': companyId,
	//		'received.jobId': jobId,
	//		'received.studentId': studentId
	//	}, {
	//		'$set': {
	//			'received.$.sendStatus': '已拒绝'
	//		}
	//	}, (err, doc) => {
	//		if(err) {
	//			getWrong(res, err);
	//		} else {
	//			Student.update({
	//				'userId': studentId,
	//				'sendInfo.jobId': jobId
	//			}, {
	//				'$set': {
	//					'sendInfo.$.sendStatus': '已拒绝'
	//				}
	//			}, (err1, doc1) => {
	//				if(err1) {
	//					getWrong(res, err1);
	//				} else {
	//					getRight(res, doc1);
	//				}
	//			})
	//		}
	//	})
})
//暴露路由
module.exports = router;