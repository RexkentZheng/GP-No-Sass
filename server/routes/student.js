// 获取需要的文件
const express = require('express');

const router = express.Router();
const Student = require('../models/student');
const User = require('../models/user');

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
function getYearsInfo(arr, startYear, endYear) {
  if (startYear && endYear) {
    const newArr = [];
    arr.forEach((op) => {
      const studentYear = parseFloat(op.personalInfo.studentNum.toString().slice(0, 4));
      if (studentYear >= parseFloat(startYear) && studentYear <= endYear) {
        newArr.push(op);
      }
    });
    return newArr;
  } else if (startYear && !endYear) {
    const newArr = [];
    arr.forEach((op) => {
      const studentYear = parseFloat(op.personalInfo.studentNum.toString().slice(0, 4));
      if (studentYear >= parseFloat(startYear)) {
        newArr.push(op);
      }
    });
    return newArr;
  }
  return arr;
}
function getNeededInfo(arr, filterName, filedCont) {
  if (filedCont) {
    const newArr = [];
    arr.forEach((op) => {
      if (op.personalInfo[filterName] === filedCont) {
        newArr.push(op);
      }
    });
    return newArr;
  }
  return arr;
}

// 测试
router.get('/', (req, res, next) => {
  Student.find({}, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, doc);
    }
  });
});

// 根据姓名查找学生信息
router.post('/studentName', (req, res, next) => {
  const { studentName } = req.body;
  Student.find({
    'personalInfo.studentName': {
      $regex: studentName,
    },
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, doc);
    }
  });
});

// 根据学号查找学生信息
router.post('/studentNum', (req, res, netx) => {
  const { studentNum } = req.body;
  Student.find({
    'personalInfo.studentNum': studentNum,
    // 这里有BUG，学生账号没有进行模糊匹配
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, doc);
    }
  });
});

// 根据ID获取学生信息
router.post('/studentDetails', (req, res, next) => {
  const userId = parseFloat(req.body.userId);
  Student.findOne({
    userId,
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, doc);
    }
  });
});

// 修改学生信息
router.post('/changeDetails', (req, res, next) => {
  const { userId, personalInfo } = req.body;
  Student.update({
    userId,
  }, {
    personalInfo,
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, doc);
    }
  });
});

// 删除学生信息
router.post('/delStudent', (req, res, next) => {
  const { userId } = req.body;
  // 删除学生表的信息
  Student.remove({
    userId,
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      // 删除用户表的信息
      User.remove({
        userId,
      }, (err1, doc1) => {
        if (err1) {
          getWrong(res, err1);
        } else {
          getRight(res, doc1);
        }
      });
    }
  });
});

// 学生简历基本信息修改
router.post('/changeBaseInfo', (req, res, next) => {
  const { studentId, filedName, changeContent } = req.body;
  Student.update({
    userId: studentId,
  }, {
    [`resumetInfo.${filedName}`]: changeContent,
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, doc);
    }
  });
});

// 学生简历数组信息修改
router.post('/changeArrayInfo', (req, res, next) => {
  const {
    studentId, filedName, changeName, changeId, changeContent,
  } = req.body;
  Student.update({
    userId: studentId,
    [`resumetInfo.${filedName}.${changeName}`]: changeId,
  }, {
    $set: {
      [`resumetInfo.${filedName}.$`]: changeContent,
    },
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, err);
    }
  });
});

// 学生简历数组添加
router.post('/addArrayInfo', (req, res, next) => {
  const { studentId, filedName, changeContent } = req.body;
  Student.update({
    userId: studentId,
  }, {
    $push: {
      [`resumetInfo.${filedName}`]: changeContent,
    },
  }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, err);
    }
  });
});

// 学生简历数组删除
router.post('/delArrayInfo', (req, res, next) => {
  const { studentId, filedName, id } = req.body;
  const changeName = '_id';
  Student.update({
    userId: studentId,
  }, {
    $pull: {
      [`resumetInfo.${filedName}`]: {
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

// 输出学生信息之前的获取
router.post('/exportInfo', (req, res, next) => {
  const {
    startYear, endYear, place, college, major, sex,
  } = req.body.choosen;
  Student.find({}, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      const docCont = doc;
      let filterInfo = [];
      filterInfo = getNeededInfo(docCont, 'studentOriginPlace', place);
      filterInfo = getNeededInfo(filterInfo, 'studentCollege', college);
      filterInfo = getNeededInfo(filterInfo, 'studentMajor', major);
      filterInfo = getNeededInfo(filterInfo, 'studentSex', sex);
      filterInfo = getYearsInfo(filterInfo, startYear, endYear);
      getRight(res, filterInfo);
    }
  });
});
// 暴露路由
module.exports = router;
