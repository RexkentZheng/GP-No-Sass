var express = require('express');
var router = express.Router();
var Test = require('../models/test');
require('./../util/util');
var hello = require('./../util/createUserId.js');
let ejsExcel = require('ejsexcel');
let fs = require('fs');
let os = require('os');
let Conf = require('../models/conf');
let Job = require('../models/job');
let Company = require('../models/company');
var mongo = require('./../util/mongo.js');

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/graduationProject';

router.get('/mongoTest', (req, res, next) => {
	mongo.MongoClient.connect(mongo.DB_CONN_STR, function(err, db) {
		let op = {}
		let collection = 'jobs'
		mongo.findMongo(collection, op, db, function(resultJ) {
			let op = {};
			let collection = 'companies'
			mongo.findMongo(collection, op, db, function(resultC) {
				resultJ.forEach((job)=>{
					resultC.forEach((company)=>{
						if (job.companyInfo.companyId == company.userId) {
							job.companyInfo = company.companyInfo;
						}
					})
				})
				res.json({
					result:resultJ
				})
			});
		});
	});
})

router.get('/mongoose',(req,res,next)=>{
	Job.find({},(err,doc)=>{
		if (err) {
			getWrong(res,err);
		}else{
			Company.find({},(err1,doc1)=>{
				if (err1) {
					getRight(res,err1);
				}else{
					let allInfo = doc;
					let comInfo = doc1;
//					console.log(allInfo);
					allInfo.forEach((job)=>{
//						console.log(job.companyInfo.companyId)
						comInfo.forEach((company)=>{
//							console.log(job);
//							console.log(company.userId);
							if (job.companyInfo.companyId == company.userId) {
								job.companyInfo === company.companyInfo;
								console.log(job.companyInfo);
							}
						})
					})
					res.json({
						result:allInfo
					})
				}
			})
		}
	})
})


router.get('/mongo', (req, res, next) => {

	var findJob = function(db, callback) {
		//获得指定的集合 
		var collection = db.collection('jobs');
		//查询数据
		var where = {};

		collection.find({}).toArray(function(err, result) {
			//如果存在错误
			if(err) {
				console.log('Error:' + err);
				return;
			}
			//调用传入的回调方法，将操作结果返回
			callback(result);
		});
	}
	var findCompany = function(db, callback) {
		//获得指定的集合 
		var collection = db.collection('companies');
		//查询数据
		var where = {};

		collection.find({}).toArray(function(err, result) {
			//如果存在错误
			if(err) {
				console.log('Error:' + err);
				return;
			}
			//调用传入的回调方法，将操作结果返回
			callback(result);
		});
	}
	MongoClient.connect(DB_CONN_STR, function(err, db) {
		let jobInfo = [];
		let companyInfo = [];
		console.log("连接成功！");
		//执行插入数据操作，调用自定义方法

		findJob(db, function(result) {
			//			db.close();
			jobInfo = result;
			let companyInfo = [];
			findCompany(db, function(result) {
				db.close();
				companyInfo = result;
				jobInfo.forEach((job) => {
					let companyId = job.companyInfo.companyId;
					companyInfo.forEach((company) => {
						if(companyId == company.userId) {
							job.companyInfo = company.companyInfo;
							console.log(job)
						}
					})
				})
				console.log(jobInfo);
				res.json({
					result: jobInfo
				})
			});
			//			console.log(jobInfo);
		});

	});
})
//console.log(os.uptime());

//let exBuf = fs.readFileSync(__dirname + './../excel/test.xlsx');
//ejsExcel.getExcelArr(exBuf).then((exlJson) => {
//	//	 console.log("************  read success:getExcelArr");
//	let workBook = exlJson;
//	let workSheets = workBook[0];
//	let all = [];
//	//写两个循环，将数据输出成带表头的对象，然后放到all这个数组里面去
//	//这里不能用forEach，因为forEach没法使用带后缀的数据
//	//因为这里的属性是变量，所以不能用arr.属性名来添加属性，只能用arr[属性名]来添加属性
//	for(i in workSheets) {
//		if(i != 0) { //这里i是0的话就会输出表头，所以i不能等于0
//			let arr = {};
//			for(x in workSheets[i]) {
//				arr[workSheets[0][x]] = workSheets[i][x];
//			}
//			all.push(arr);
//		}
//	}
//	//	console.log(all);
//}).catch((err) => {
//	console.log("************** had error!");
//	console.log(err);
//});

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

//测试conf
router.get('/conf', (req, res, next) => {
	Conf.findOne({}, (err, doc) => {
		if(err) {
			getWrong(res, err);
		} else {
			getRight(res, doc);
		}
	})
})





router.get('/getTime',(req,res,next)=>{
	let nowDate = new Date().Format('yyyy/MM/dd hh:mm:ss')
	let ms = new Date(new Date().Format('yyyy/MM/dd hh:mm:ss')).getTime();
	
//	let realDate = .Format('yyyy-MM-dd hh:mm:ss');
//	let ss = 1512008023371;
	var shit = new Date( ms ) ;
	commonTime = shit.toLocaleString();
	res.json({
		status:0,
		result:commonTime
	})
})
//router.get('/', function(req, res, next) {
//	Test.findOne({}).sort({
//		num: -1
//	}).limit(1).exec(function(err, doc) {
//		if(err) {
//			getWrong(res, err);
//		} else {
//			let userType = 3;
//			let test = hello.createUserId(doc.num, userType);
//			res.json({
//				//				'自增数':shit,
//				'时间': doc.num,
//				'用户类型': test,
//				//				'nowDate':nowDate
//			});
//		}
//	})
//})

//Student.create({
//			'userId': userId,
//			'userType': userType,
//			'personalInfo.studentName': all[x].姓名,
//			'personalInfo.studentNum': all[x].学号,
//			'personalInfo.studentSex': all[x].性别,
//			'personalInfo.studentMajor': all[x].专业,
//			'personalInfo.studentUniversity': all[x].学校,
//			'personalInfo.studentEducation': all[x].学历,
//			'personalInfo.studentNativePlace': all[x].籍贯,
//			'personalInfo.studentOrginPlace': all[x].生源地,
//			'personalInfo.studentPaperInfo.paperTitle': all[x].论文标题,
//			'personalInfo.studentPaperInfo.paperContent': all[x].论文内容,
//			'personalInfo.studentTutorInfo.tutorName': all[x].导师姓名,
//			'personalInfo.studentTutorInfo.tutorPosition': all[x].导师职位,
//			'personalInfo.employmentInfo.isEmployment': false,
//			'personalInfo.employmentInfo.companyId': '',
//			'personalInfo.employmentInfo.companyName': '',
//		}, (err1, doc1) => {
//			if(err1) {
//				getWrong(res, err1);
//			} else {
//				User.create({
//					'userName': all[x].学号,
//					'userPwd': all[x].学号,
//					'userType': userType,
//					'userId': userId,
//					'isWaitting': false,
//					'isPass': true
//				}, (err2, doc2) => {
//					if(err2) {
//						getWrong(res, err2);
//					} else {
//
//					}
//				})
//			}
//		})

module.exports = router;