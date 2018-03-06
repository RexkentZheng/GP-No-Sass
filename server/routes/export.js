//获取需要的文件
var express = require('express');
var router = express.Router();
let multer = require("multer");
let fs = require("fs");
let ejsExcel = require("ejsexcel");
let exlBuf = fs.readFileSync("./excel/model.xlsx");
let path = require("path");

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

function filter(studentInfo,filterInfo,titleInfo) {
  titleInfo.forEach((oneTitle) => {
    let sortArr = [];
    sortArr.push(oneTitle.chineseName);
    studentInfo.forEach((oneStudent)=>{
      sortArr.push(oneStudent.personalInfo[''+oneTitle.englishName+'']);
    })    
    filterInfo.push(sortArr);
  });
  return filterInfo
}

function sortInfo(filterInfo) {
  let sortedInfo = [];
  for (let i = 0; i < filterInfo[0].length; i++) {
    let og = [];
    for (let j = 0; j < filterInfo.length; j++) {
      og.push(filterInfo[j][i]);
    }
    sortedInfo.push(og);
  }
  return sortedInfo
}

function fileName() {
  let nowDate = new Date();
  let fileName =
    "学生信息" +
    nowDate.getFullYear() +
    "-" +
    (nowDate.getMonth() + 1) +
    "月报"
  return fileName;
}

router.post('/studentInfo',(req,res,next)=>{
  let { studentInfo, titleInfo } = req.body;
  let filterInfo = [];
  let sortedInfo = [];
  filterInfo =  filter(studentInfo,filterInfo,titleInfo);
  sortedInfo = sortInfo(filterInfo);
  ejsExcel.renderExcel(exlBuf, filterInfo).then(function(exlBuf2) {
            fs.writeFileSync("./result/" + '123' + ".xlsx", exlBuf2);
            console.log("end.xlsx");
          }).catch(function(err) {
            console.error(err);
          });
});

//暴露路由
module.exports = router;
