const express = require('express');
const md5 = require('md5');

const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const upload = require('./../util/upload');
const ejsExcel = require('ejsexcel');
const Test = require('../models/test');
const Student = require('../models/student');
const User = require('../models/user');
const Conf = require('../models/conf');
const hello = require('./../util/createUserId.js');
require('./../util/util');

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

// Excel注册学生账号接口（这里有个问题，是循环的时候出现了，应该将用户表的成功放在学生表注册成功内，但是放进去
// 之后userId会有文问题）
router.post('/excel', (req, res, next) => {
  upload.uploadTest(req, res, (err) => {
    if (err) {
      getWrong(res, err);
    } else {
      // 上传成功之后修改文件名
      const { path } = req.file;
      const exBuf = fs.readFileSync(path);
      ejsExcel.getExcelArr(exBuf).then((exlJson) => {
        const workBook = exlJson;
        const workSheets = workBook[0];
        const all = [];
        // 写两个循环，将数据输出成带表头的对象，然后放到all这个数组里面去
        // 这里不能用forEach，因为forEach没法使用带后缀的数据
        // 因为这里的属性是变量，所以不能用arr.属性名来添加属性，只能用arr[属性名]来添加属性
        for (i in workSheets) {
          if (i != 0) { // 这里i是0的话就会输出表头，所以i不能等于0
            const arr = {};
            for (x in workSheets[i]) {
              arr[workSheets[0][x]] = workSheets[i][x];
            }
            all.push(arr);
          }
        }
        for (i = 0; i < 3; i++) {
          userId = i;
        }
        console.log(userId);
        Student.findOne({}).sort({
          userId: -1,
        }).limit(1).exec((err, doc) => {
          let userId = 0;
          let maxDate = 0;
          const userType = 2;
          maxDate = doc.userId;
          all.forEach((item) => {
            userId = hello.createUserId(maxDate, userType);
            Student.create({
              userId,
              userType,
              'personalInfo.studentName': item.姓名,
              'personalInfo.studentNum': item.学号,
              'personalInfo.studentSex': item.性别,
              'personalInfo.studentMajor': item.专业,
              'personalInfo.studentUniversity': item.学校,
              'personalInfo.studentEducation': item.学历,
              'personalInfo.studentNativePlace': item.籍贯,
              'personalInfo.studentOrginPlace': item.生源地,
              'personalInfo.studentPaperInfo.paperTitle': item.论文标题,
              'personalInfo.studentPaperInfo.paperContent': item.论文内容,
              'personalInfo.studentTutorInfo.tutorName': item.导师姓名,
              'personalInfo.studentTutorInfo.tutorPosition': item.导师职位,
              'personalInfo.employmentInfo.isEmployment': false,
              'personalInfo.employmentInfo.companyId': '',
              'personalInfo.employmentInfo.companyName': '',
            }, (err1, doc1) => {
              if (err1) {
                getWrong(res, err1);
              }
            });
            User.create({
              userName: item.学号,
              userPwd: md5(item.学号),
              userType,
              userId,
              isWaitting: false,
              isPass: true,
            }, (err2, doc2) => {
              if (err2) {
                getWrong(res, err2);
              }
            });
            maxDate = userId;
          });
        });
        fs.unlink(path, (err) => {
          if (err) {
            getWrong(res, err);
          } else {
            getRight(res, req.file);
          }
        });
      });
    }
  });
});

// 测试接口
router.post('/test', (req, res, next) => {
  upload.uploadTest(req, res, (err) => {
    if (err) {
      getWrong(res, err);
    } else {
      // 上传成功之后修改文件名
      const path = req.file.path;
      const exBuf = fs.readFileSync(path);
      ejsExcel.getExcelArr(exBuf).then((exlJson) => {
        const workBook = exlJson;
        const workSheets = workBook[0];
        const all = [];
        // 写两个循环，将数据输出成带表头的对象，然后放到all这个数组里面去
        // 这里不能用forEach，因为forEach没法使用带后缀的数据
        // 因为这里的属性是变量，所以不能用arr.属性名来添加属性，只能用arr[属性名]来添加属性
        for (i in workSheets) {
          if (i !== 0) { // 这里i是0的话就会输出表头，所以i不能等于0
            const arr = {};
            for (x in workSheets[i]) {
              arr[workSheets[0][x]] = workSheets[i][x];
            }
            all.push(arr);
          }
        }
        all.forEach((item) => {
          Test.create({
            name: item.姓名,
            age: item.年龄,
            sex: item.性别,
            StudentNum: item.学号,
            op: item.籍贯,
            np: item.生源地,
          }, (err, doc) => {
            if (err) {
              getWrong(res, err);
            }
          });
        });
        fs.unlink(path, (err) => {
          if (err) {
            getWrong(res, err);
          } else {
            getRight(res, req.file);
          }
        });
      });
    }
  });
});

// 上传学生头像
router.post('/studentProtrait', (req, res, next) => {
  upload.uploadStudentProtrait(req, res, (err) => {
    if (err) {
      res.json({
        status: 1,
        msg: err.message,
        result: '',
      });
    } else {
      // 上传成功之后修改文件名
      fs.rename(req.file.path, `${req.file.destination}/${req.body.id}-${req.body.name}.png`, (err1) => {
        if (err1) {
          res.json({
            status: 11,
            msg: err1.message,
            result: '',
          });
        } else {
          res.json({
            status: 0,
            msg: 'Suc',
            src: req.file,
            result: '',
          });
        }
      });
    }
  });
});

router.post('/companyLogo', (req, res, next) => {
  upload.uploadCompanyLogo(req, res, (err) => {
    if (err) {
      res.json({
        status: 1,
        msg: err.message,
        result: '',
      });
    } else {
      // 上传成功之后修改文件名
      fs.rename(req.file.path, `${req.file.destination}/${req.body.id}-${req.body.name}.png`, (err1) => {
        if (err1) {
          res.json({
            status: 11,
            msg: err1.message,
            result: '',
          });
        } else {
          res.json({
            status: 0,
            msg: 'Suc',
            src: req.file,
            result: '',
          });
        }
      });
    }
  });
});

// 添加产品图片
router.post('/addProductionImg', (req, res, next) => {
  upload.uploadAddCompanyProductions(req, res, (err) => {
    if (err) {
      res.json({
        status: 1,
        msg: err.message,
        result: '',
      });
    } else {
      res.json({
        status: 0,
        msg: '',
        result: req.file,
      });
    }
  });
});

// 修改产品图片
router.post('/changeProductionImg', (req, res, next) => {
  upload.uploadChangeCompanyProductions(req, res, (err) => {
    fs.rename(req.file.path, `${req.file.destination}/${req.body.id}-${req.body.name}.png`, (err1) => {
      if (err1) {
        res.json({
          status: 11,
          msg: err1.message,
          result: '',
        });
      } else {
        res.json({
          status: 0,
          msg: 'Suc',
          result: req.file,
        });
      }
    });
  });
});

// 公司执照图片
router.post('/addCompanyLicense', (req, res, next) => {
  upload.uploadCompanyLicense(req, res, (err) => {
    if (err) {
      console.log(err);
    } else if (req.body.license === 'default.jpg') {
      res.json({
        status: 0,
        msg: 'Suc',
        result: req.file,
      });
    } else {
      fs.unlink(`./../gp/static/companyLicense/${req.body.license}`, (err) => {
        if (err) {
          res.json({
            status: 1,
            msg: err,
            result: '',
          });
        } else {
          res.json({
            status: 0,
            msg: 'Suc',
            result: req.file,
          });
        }
      });
    }
  });
});

// 取消公司执照
router.post('/cancelCompanyLicense', (req, res, next) => {
  const imgName = req.body.imgName;
  fs.unlink(`./../gp/static/companyLicense/${imgName}`, (err) => {
    if (err) {
      res.json({
        status: 1,
        msg: err,
        result: '',
      });
    } else {
      res.json({
        status: 0,
        msg: 'Suc',
        result: req.file,
      });
    }
  });
});

// 添加Banner图片
router.post('/changeBannerImg', (req, res, next) => {
  upload.uploadBannerImg(req, res, (err) => {
    if (err) {
      res.json({
        status: 1,
        msg: err.message,
        result: '',
      });
    } else {
      const oldImgName = req.body.imgName;
      fs.unlink(`./../gp/static/banner/${oldImgName}`, (err) => {
        if (err) {
          res.json({
            status: 1,
            msg: err.message,
            result: '',
          });
        } else {
          const newName = req.file.filename;
          Conf.update({
            _id: '5a1538b9d1c84167f6d1fb8c',
            'bannerImg.imgName': oldImgName,
          }, {
            $set: {
              'bannerImg.$.imgName': newName,
            },
          }, (err1, doc1) => {
            if (err1) {
              getWrong(res, err1);
            } else {
              res.json({
                status: 0,
                msg: 'Suc',
                fileInfo: req.file,
                baseInfo: doc1,
              });
            }
          });
        }
      });
    }
  });
});

// 添加banner图片
router.post('/addBannerImg', (req, res, next) => {
  upload.uploadBannerImg(req, res, (err) => {
    const imgInfo = {
      imgName: req.file.filename,
    };
    if (err) {
      res.json({
        status: 1,
        msg: err.message,
        result: '',
      });
    } else {
      Conf.update({
        _id: '5a1538b9d1c84167f6d1fb8c',
      }, {
        $push: {
          bannerImg: imgInfo,
        },
      }, (err, doc) => {
        if (err) {
          getWrong(res, err);
        } else {
          res.json({
            status: 0,
            msg: '',
            result: doc,
            fileInfo: req.file,
          });
        }
      });
    }
  });
});

// 暴露路由
module.exports = router;
