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
      if (oneTitle.englishName.indexOf('.')>0) {
        const titlePart = oneTitle.englishName.split('.');
        sortArr.push(oneStudent.personalInfo[titlePart[0]][titlePart[1]]);
      }else{
        sortArr.push(oneStudent.personalInfo[oneTitle.englishName]);
      }
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

let getfileName = (titleInfo)=>{
  let nowDate = new Date();
  let chinese = []
  titleInfo.forEach((op)=>{
    chinese.push(op.chineseName)
  })
  chinese = chinese.join('-');
  let name = 
    nowDate.getFullYear() +
    "-" +
    (nowDate.getMonth() + 1) +
    "-" +
    nowDate.getDate() +
    "-" +
    chinese
  return name
}

router.post('/studentInfo',(req,res,next)=>{
  let { studentInfo, titleInfo } = req.body;
  let fileName = getfileName(titleInfo);
  let filterInfo = [];
  let sortedInfo = [];
  filterInfo =  filter(studentInfo,filterInfo,titleInfo);
  sortedInfo = sortInfo(filterInfo);
  ejsExcel.renderExcel(exlBuf, sortedInfo).then(function(exlBuf2){
    fs.writeFileSync("./excel/"+fileName+".xlsx", exlBuf2);
    console.log("生成"+fileName+".xlsx");
    getRight(res,fileName)
  }).catch(function(err) {
    console.error(err);
  });
})

router.get("/download", function(req, res, next) {
  var currDir = path.normalize(req.query.dir),
    fileName = req.query.name,
    currFile = path.join(currDir, fileName),
    fReadStream;

  fs.exists(currFile, function(exist) {
    if (exist) {
      res.set({
        "Content-type": "application/octet-stream",
        "Content-Disposition": "attachment;filename=" + encodeURI(fileName)
      });
      fReadStream = fs.createReadStream(currFile);
      fReadStream.on("data", chunk => res.write(chunk, "binary"));
      fReadStream.on("end", function() {
        res.end();
      });
    } else {
      res.set("Content-type", "text/html");
      res.send("file not exist!");
      res.end();
    }
  });
});

//暴露路由
module.exports = router;
