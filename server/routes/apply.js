// 获取需要的部件
const express = require('express');
const md5 = require('md5');

const router = express.Router();
const mongoose = require('mongoose');
const Apply = require('../models/apply');
const User = require('../models/user');
const fs = require('fs');


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

router.get('/', (req, res, next) => {
  Apply.find({}, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, doc);
    }
  });
});

// 商家申请
router.post('/regedit', (req, res, next) => {
  const param = {
    userName: req.body.userName,
    userPwd: md5(req.body.userPwd),
    hrName: req.body.hrName,
    hrTel: req.body.hrTel,
    hrEmail: req.body.hrEmail,
    license: req.body.license,
    companyName: req.body.companyName,
    userType: req.body.userType,
    isChecked: req.body.isChecked,
  };
  // 判断电话是否重复
  Apply.findOne({ hrTel: param.hrTel }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else if (doc) {
      res.json({
        status: 2,
        msg: '当前用户正在审核，请勿重复注册',
        result: '',
      });
    } else {
      // 判断用户名是否重复
      Apply.findOne({ userName: param.userName }, (err1, doc1) => {
        if (err1) {
          getWrong(res, err1);
        } else if (doc1) {
          res.json({
            status: 2,
            msg: '用户名重复，请重新输入用户名',
            result: '',
          });
        } else {
          // 在申请表中创建
          Apply.create(param, (err2, doc2) => {
            if (err2) {
              res.json({
                status: 1,
                msg: err2.message,
                result: '',
              });
            } else {
              // 在用户表中创建
              User.create({
                userName: param.userName,
                userPwd: param.userPwd,
                userType: param.userType,
                isWaitting: true,
              }, (err3, doc3) => {
                if (err3) {
                  getWrong(res, err3);
                } else {
                  fs.rename(`./../gp/static/companyLicense/${param.license}`, `./../gp/static/companyLicense/${param.hrName}-${param.hrTel}.png`, (err4) => {
                    if (err4) {
                      getWrong(res, err4);
                    } else {
                      Apply.update({ hrTel: param.hrTel }, { $set: { companyLisence: `./../../static/companyLicense/${param.hrName}-${param.hrTel}.png` } }, (err5, doc5) => {
                        if (err5) {
                          getWrong(res, err5);
                        } else {
                          res.json({
                            status: 0,
                            msg: '申请成功，请耐心等候审核',
                            result: doc3,
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});

// 申请详情接口
router.post('/Details', (req, res, next) => {
  const { hrTel } = req.body;
  Apply.findOne({ hrTel }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, doc);
    }
  });
});


// 暴露结果
module.exports = router;
