// 获取需要的文件
const express = require('express');

const router = express.Router();
const Job = require('../models/job');
const Company = require('../models/company');
const hello = require('./../util/createUserId.js');
const mongo = require('./../util/mongo.js');
require('./../util/util');
// 获取路由
// 测试数据是否接收
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

// 获取有企业信息的公司列表
// 此处用的原生mongodb
router.get('/list', (req, res, next) => {
  let collection = 'jobs';
  const op = {};
  mongo.MongoClient.connect(mongo.DB_CONN_STR, (err, db) => {
    mongo.findMongo(collection, op, db, (jobs) => {
      const changedJobList = jobs;
      const finalJobList = [];
      collection = 'companies';
      mongo.findMongo(collection, op, db, (companies) => {
        changedJobList.forEach((job) => {
          companies.forEach((company) => {
            if (job.companyId === company.userId) {
              job.companyInfo = company.companyInfo;
              job.companyInfo.companyBaseInfo.companyName = company.regeditInfo.companyName;
            }
          });
          if (job.isOnline) {
            finalJobList.push(job);
          }
        });
        getRight(res, finalJobList);
      });
    });
  });
});

// 获取公司页面下的职位列表
router.post('/getCompanyJobList', (req, res, next) => {
  const companyId = parseFloat(req.body.userId);
  Job.find({
    companyId,
  }, (err, CompanyjobList) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, CompanyjobList);
    }
  });
});

// 查找具体职位信息
router.post('/jobDetails', (req, res, next) => {
  const jobId = parseFloat(req.body.jobId);
  Job.findOne({
    jobId,
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else if (doc) {
      getRight(res, doc);
    } else {
      res.json({
        status: 1,
        msg: '没有这个数据',
        result: '',
      });
    }
  });
});

// 修改职位上下线信息
router.post('/changeOnlineStatus', (req, res, next) => {
  const { jobId, isOnline } = req.body;
  Job.update({
    jobId,
  }, {
    isOnline,
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, doc);
    }
  });
});

// 职位详情页调用的借口，包括公司信息
router.post('/allInfo', (req, res, next) => {
  const { jobId } = req.body;
  // 声明总的一个对象，然后再添加两个属性
  const allInfo = {};
  allInfo.jobInfo = {};
  allInfo.companyInfo = {};
  Job.findOne({
    jobId,
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      allInfo.jobInfo = doc;
      Company.findOne({
        userId: doc.companyId,
      }, (err1, doc1) => {
        if (err1) {
          getWrong(err1);
        } else {
          allInfo.companyInfo = doc1;
          res.json({
            status: 0,
            msg: '',
            result: allInfo,
          });
        }
      });
    }
  });
});

// 保存修改的职位内容
router.post('/savaJobChanges', (req, res, next) => {
  const { jobId } = req.body;
  const changes = req.body.jobInfo;
  Job.update({
    jobId,
  }, changes, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, doc);
    }
  });
});

// 新建职位
router.post('/createjob', (req, res, next) => {
  // 新建两个变量
  const { jobInfo } = req.body;
  Company.findOne({
    userId: jobInfo.companyId,
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      let isFinish = true;
      for (const key in doc.companyInfo) {
        if (!doc.companyInfo[key]) {
          isFinish = false;
        }
      }
      for (const key in doc.companyInfo.companyBaseInfo) {
        if (!doc.companyInfo.companyBaseInfo[key]) {
          isFinish = false;
        }
      }
      if (isFinish) {
        jobInfo.createdTime = new Date(new Date().Format('yyyy/MM/dd hh:mm:ss')).getTime();
        Job.findOne({}).sort({
          jobId: -1,
        }).limit(1).exec((err, doc) => {
          if (err) {
            getWrong(res, err);
          } else if (doc) {
            const maxDate = doc.jobId;
            jobInfo.jobId = hello.createUserId(maxDate, 4);
            Job.create(jobInfo, (err1, doc1) => {
              if (err1) {
                getWrong(res, err1);
              } else {
                getRight(res, doc1);
              }
            });
          } else {
            const maxDate = 201401010410000;
            jobInfo.jobId = hello.createUserId(maxDate, 4);
            Job.create(jobInfo, (err1, doc1) => {
              if (err1) {
                getWrong(res, err1);
              } else {
                getRight(res, doc1);
              }
            });
          }
        });
      } else {
        res.json({
          status: 1001,
          msg: '当前用户未完善基本信息，请完善信息之后再发布职位',
          result: '',
        });
      }
    }
  });
});

// 删除职位
router.post('/delJob', (req, res, next) => {
  const { jobId } = req.body;
  Job.remove({
    jobId,
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, doc);
    }
  });
});

// 查找学生没有投递过的职位
router.post('/receivedList', (req, res, next) => {
  const { studentId } = req.body;
  const received = [];
  Company.find({
    'received.studentId': studentId,
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      doc.forEach((all) => {
        all.received.forEach((alone) => {
          received.push(alone);
        });
      });
      getRight(res, received);
    }
  });
});

// 根据职位类别查找职位
router.post('/jobType', (req, res, next) => {
  let op = {
    jobTypeThird: req.body.jobType,
  };
  let collection = 'jobs';
  mongo.MongoClient.connect(mongo.DB_CONN_STR, (err, db) => {
    mongo.findMongo(collection, op, db, (jobs) => {
      const changedJobList = jobs;
      collection = 'companies';
      op = {};
      mongo.findMongo(collection, op, db, (companies) => {
        changedJobList.forEach((job) => {
          companies.forEach((company) => {
            if (job.companyId === company.userId) {
              job.companyInfo = company.companyInfo;
              job.companyInfo.companyBaseInfo.companyName = company.regeditInfo.companyName;
            }
          });
        });
        getRight(res, changedJobList);
      });
    });
  });
});

// 关键词查找职位
router.post('/jobKeyWords', (req, res, next) => {
  const { keyWords } = req.body;
  const reg = new RegExp(keyWords, 'i'); // 这里的i是一个参数，表示不区分大小写
  // 这里用到了$regex和$or,这是mongoose里面的模糊查询
  // 详情请访问：http://blog.csdn.net/salmonellavaccine/article/details/53838284
  Job.find({
    $or: [{
      jobTypeFirst: {
        $regex: reg,
      },
    }, // 三级职位类型中有匹配的值就可以
    {
      jobTypeThird: {
        $regex: reg,
      },
    },
    {
      jobTypeSecond: {
        $regex: reg,
      },
    },
    ],

  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, doc);
    }
  });
});

// 职位条件查询
router.post('/filter', (req, res, next) => {
  const { keyWords } = req.body;
  const jobRequirement = req.body.jobRequirementAc;
  const jobType = req.body.jobFormAc;
  const jobSalary = req.body.jobSalaryAc;
  let collection = 'jobs';
  let op = {};
  op.jobTypeThird = keyWords;
  if (jobRequirement !== '不限') {
    op.jobRequirement = jobRequirement;
  }
  if (jobType !== '不限') {
    op.jobType = jobType;
  }
  if (jobSalary !== '不限') {
    op.jobSalary = jobSalary;
  }
  mongo.MongoClient.connect(mongo.DB_CONN_STR, (err, db) => {
    mongo.findMongo(collection, op, db, (jobs) => {
      const changedJobList = jobs;
      collection = 'companies';
      op = {};
      mongo.findMongo(collection, op, db, (companies) => {
        changedJobList.forEach((job) => {
          companies.forEach((company) => {
            if (job.companyId === company.userId) {
              job.companyInfo = company.companyInfo;
              job.companyInfo.companyBaseInfo.companyName = company.regeditInfo.companyName;
            }
          });
        });
        getRight(res, changedJobList);
      });
    });
  });
});

// 暴露路由
module.exports = router;
