// 获取需要的文件
const express = require('express');
const md5 = require('md5');

const router = express.Router();
const Company = require('../models/company');
const Student = require('../models/student');
const fs = require('fs');
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
// 测试数据是否接收
router.get('/', (req, res, next) => {
  Company.find({}, (err, doc) => {
    if (err) {
      res.json({
        status: 1,
        msg: err.message,
      });
    } else {
      res.json({
        status: 0,
        msg: '',
        result: {
          count: doc.length,
          list: doc,
        },
      });
    }
  });
});

// 根据名称查找公司列表
router.post('/companyName', (req, res, next) => {
  const { companyName } = req.body;
  Company.find({
    'regeditInfo.companyName': {
      $regex: companyName,
    },
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, doc);
    }
  });
});

// 获取公司的收件箱列表
router.post('/received', (req, res, next) => {
  const userId = parseFloat(req.body.userId);
  Company.findOne({
    userId,
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, doc);
    }
  });
});

// 获取公司信息
router.post('/companyDetails', (req, res, next) => {
  const userId = parseFloat(req.body.userId);
  Company.findOne({
    userId,
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else if (doc) {
      getRight(res, doc);
    } else {
      res.json({
        status: 1,
        msg: '没有这个用户',
        result: '',
      });
    }
  });
});

// 修改公司基本信息
router.post('/changeBaseInfo', (req, res, next) => {
  const { userId } = req.body;
  const { changeBaseInfo } = req.body;
  Company.update({
    userId,
  }, {
    'companyInfo.companyBaseInfo': changeBaseInfo,
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, doc);
    }
  });
});

// 修改公司标签
router.post('/changeLabel', (req, res, next) => {
  const { userId, label } = req.body;
  Company.update({
    userId,
  }, {
    'companyInfo.companyLabel': label,
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, doc);
    }
  });
});

// 修改公司介绍
router.post('/changeIntroduce', (req, res, next) => {
  const { userId, companyIntroduce } = req.body;
  Company.update({
    userId,
  }, {
    'companyInfo.companyIntroduce': companyIntroduce,
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, doc);
    }
  });
});

// 修改公司基本信息
router.post('/changeCompanyInfo', (req, res, next) => {
  const { companyId, filedName, changeContent } = req.body;
  Company.update({
    userId: companyId,
  }, {
    [`companyInfo.${filedName}`]: changeContent,
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, doc);
    }
  });
});

// 公司数组信息修改
router.post('/changeArrayInfo', (req, res, next) => {
  const {
    companyId, changeName, changeId, changeContent,
  } = req.body;
  if (changeContent.imgName) {
    const delImgh = changeContent.imgName;
    fs.unlink(`./../gp/static/companyProduction/${delImgh}`, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log('文件删除成功');
      changeContent.imgName = '';
      Company.update({
        userId: companyId,
        [`companyProduction.${changeName}`]: changeId,
      }, {
        $set: {
          'companyProduction.$': changeContent,
        },
      }, (err, doc) => {
        if (err) {
          getWrong(res, err);
        } else {
          getRight(res, err);
        }
      });
      return [];
    });
  } else {
    Company.update({
      userId: companyId,
      [`companyProduction.${changeName}`]: changeId,
    }, {
      $set: {
        'companyProduction.$': changeContent,
      },
    }, (err, doc) => {
      if (err) {
        getWrong(res, err);
      } else {
        getRight(res, err);
      }
    });
  }
});

// 公司数组信息添加
router.post('/addArrayInfo', (req, res, next) => {
  const { companyId, changeContent } = req.body;
  Company.update({
    userId: companyId,
  }, {
    $push: {
      companyProduction: changeContent,
    },
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, err);
    }
  });
});

// 公司数组信息删除
router.post('/delArrayInfo', (req, res, next) => {
  const { companyId, id } = req.body;
  Company.update({
    userId: companyId,
  }, {
    $pull: {
      companyProduction: {
        _id: id,
      },
    },
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, err);
    }
  });
});

// 学生投递简历
router.post('/addReceive', (req, res, next) => {
  const { companyId } = req.body;
  const param = {
    studentId: req.body.studentId,
    jobId: req.body.jobId,
    sendStatus: req.body.sendStatus,
    receivedTime: new Date().Format('yyyy-MM-dd'),
  };
  const paramStudent = {
    companyId: req.body.companyId,
    sendStatus: '待沟通',
    jobId: req.body.jobId,
    sendDate: new Date().Format('yyyy-MM-dd'),
  };
  Student.findOne({
    userId: param.studentId,
  }, (err, doc) => {
    let isFinish = true;
    for (const key in doc.resumetInfo) {
      if (!doc.resumetInfo[key]) {
        isFinish = false;
      }
    }
    if (isFinish) {
      Company.find({
        userId: companyId,
        'received.studentId': param.studentId,
        'received.jobId': param.jobId,
      }, (err, doc) => {
        if (err) {
          getWrong(res, err);
        } else if (doc.length === 1) {
          res.json({
            status: 2,
            msg: '已投递',
            result: '',
          });
        } else {
          Company.update({
            userId: companyId,
          }, {
            $push: {
              received: param,
            },
          }, (err, doc) => {
            if (err) {
              getWrong(res, err);
            } else {
              Student.update({
                userId: param.studentId,
              }, {
                $push: {
                  sendInfo: paramStudent,
                },
              }, (err, doc) => {
                if (err) {
                  getWrong(res, err);
                } else {
                  getRight(res, doc);
                }
              });
            }
          });
        }
      });
    } else {
      res.json({
        status: 1001,
        msg: '简历信息未完善',
        result: '',
      });
    }
  });
});

// 邀请面试接口
router.post('/saveInvitation', (req, res, next) => {
  const companyId = parseFloat(req.body.companyId);
  const param = {
    interviewDist: req.body.interviewDist,
    interviewDate: req.body.interviewDate,
    interviewHalfday: req.body.interviewHalfday,
    interviewTime: req.body.interviewTime,
    studentId: req.body.studentId,
    jobId: req.body.jobId,
  };
  Company.update({
    userId: companyId,
  }, {
    $push: {
      interview: param,
    },
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      Company.findOne({
        userId: companyId,
      }, (err, doc) => {
        if (err) {
          getWrong(res, err);
        } else {
          for (let i = 0; i < doc.received.length; i += 1) {
            if (doc.received[i].jobId === param.jobId && doc.received[i].studentId === param.studentId) {
              doc.received[i].sendStatus = '已邀请';
              doc.markModified('sendStatus');
              doc.save((err) => {
                Student.update({
                  userId: param.studentId,
                  'sendInfo.jobId': param.jobId,
                  'sendInfo.companyId': companyId,
                }, {
                  $set: {
                    'sendInfo.$.sendStatus': '邀请面试',
                    'sendInfo.$.interviewDate': param.interviewDate,
                    'sendInfo.$.interviewHalfday': param.interviewHalfday,
                    'sendInfo.$.interviewTime': param.interviewTime,
                    'sendInfo.$.interviewDist': param.interviewDist,
                  },
                }, (err, doc) => {
                  if (err) {
                    getWrong(res, err);
                  } else {
                    getRight(res, doc);
                  }
                });
              });
            }
          }
        }
      });
    }
  });
});

// 拒绝接口

// 老实说，这里有个BUG，具体的就看学生修改信息的方法，这个方法是用$set来修改内容的，可是在Company里用同样
// 的方法不管用，实在是不知道为什么了，于是就用了个循环来判断下内容是不是一样，然后用save来保存修改的内容
router.post('/refuseInvitation', (req, res, next) => {
  const companyId = parseFloat(req.body.companyId);
  const { studentId, jobId, test } = req.body;
  Company.findOne({
    userId: companyId,
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      for (let i = 0; i < doc.received.length; i += 1) {
        if (doc.received[i].jobId === jobId && doc.received[i].studentId === studentId) {
          doc.received[i].sendStatus = '已拒绝';
          doc.markModified('sendStatus');
          doc.save((err) => {
            Student.update({
              userId: studentId,
              'sendInfo.jobId': jobId,
              'sendInfo.companyId': companyId,
            }, {
              $set: {
                'sendInfo.$.sendStatus': '不合适',
              },
            }, (err, doc) => {
              if (err) {
                getWrong(res, err);
              } else {
                getRight(res, doc);
              }
            });
          });
        }
      }
    }
  });
});
// 暴露路由
module.exports = router;
