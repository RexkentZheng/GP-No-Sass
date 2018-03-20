// 获取需要的文件
const express = require('express');

const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const ejsExcel = require('ejsexcel');

const exlBuf = fs.readFileSync('./excel/model.xlsx');
const path = require('path');

function getWrong(res, err) {
  return res.json({
    status: 1,
    msg: err.message,
    result: '',
  });
}

function getRight(res, doc) {
  return res.json({
    status: 0,
    msg: '',
    result: doc,
  });
}

function filter(studentInfo, filterInfo, titleInfo) {
  titleInfo.forEach((oneTitle) => {
    const sortArr = [];
    sortArr.push(oneTitle.chineseName);
    studentInfo.forEach((oneStudent) => {
      if (oneTitle.englishName.indexOf('.') > 0) {
        const titlePart = oneTitle.englishName.split('.');
        sortArr.push(oneStudent.personalInfo[titlePart[0]][titlePart[1]]);
      } else {
        sortArr.push(oneStudent.personalInfo[oneTitle.englishName]);
      }
    });
    filterInfo.push(sortArr);
  });
  return filterInfo;
}

function sortInfo(filterInfo) {
  const sortedInfo = [];
  for (let i = 0; i < filterInfo[0].length; i += 1) {
    const og = [];
    for (let j = 0; j < filterInfo.length; j += 1) {
      if (typeof (filterInfo[j][i]) === 'boolean') {
        if (filterInfo[j][i]) {
          og.push('是');
        } else {
          og.push('否');
        }
      } else {
        og.push(filterInfo[j][i]);
      }
    }
    sortedInfo.push(og);
  }
  return sortedInfo;
}

const getfileName = (titleInfo) => {
  const nowDate = new Date();
  let chinese = [];
  titleInfo.forEach((op) => {
    chinese.push(op.chineseName);
  });
  chinese = chinese.join('-');
  const name =
    `${nowDate.getFullYear()
    }-${
      nowDate.getMonth() + 1
    }-${
      nowDate.getDate()
    }-${
      chinese}`;
  return name;
};

router.post('/studentInfo', (req, res, next) => {
  const { studentInfo, titleInfo } = req.body;
  const fileName = getfileName(titleInfo);
  let filterInfo = [];
  let sortedInfo = [];
  filterInfo = filter(studentInfo, filterInfo, titleInfo);
  sortedInfo = sortInfo(filterInfo);
  ejsExcel.renderExcel(exlBuf, sortedInfo).then((exlBuf2) => {
    fs.writeFileSync(`./excel/${fileName}.xlsx`, exlBuf2);
    console.log(`生成${fileName}.xlsx`);
    getRight(res, fileName);
  }).catch((err) => {
    console.error(err);
  });
});

router.get('/download', (req, res, next) => {
  const currDir = path.normalize(req.query.dir);
  const fileName = req.query.name;
  const currFile = path.join(currDir, fileName);
  let fReadStream;

  fs.exists(currFile, (exist) => {
    if (exist) {
      res.set({
        'Content-type': 'application/octet-stream',
        'Content-Disposition': `attachment;filename=${encodeURI(fileName)}`,
      });
      fReadStream = fs.createReadStream(currFile);
      fReadStream.on('data', chunk => res.write(chunk, 'binary'));
      fReadStream.on('end', () => {
        res.end();
      });
    } else {
      res.set('Content-type', 'text/html');
      res.send('file not exist!');
      res.end();
    }
  });
});

// 暴露路由
module.exports = router;
