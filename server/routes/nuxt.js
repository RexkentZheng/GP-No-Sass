// 获取需要的部件
const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const Nuxt = require('../models/nuxt');

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
  Nuxt.find({}, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, doc);
    }
  });
});

// 文章详情
router.post('/Details', (req, res, next) => {
  const { title } = req.body;
  console.log(title);
  Nuxt.findOne({ title }, (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      console.log(doc);
      getRight(res, doc);
    }
  });
});

//  文章列表
router.get('/List', (req, res, next) => {
  Nuxt.find({},'title', (err,doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, doc);
    }
  })
})


// 暴露结果
module.exports = router;
