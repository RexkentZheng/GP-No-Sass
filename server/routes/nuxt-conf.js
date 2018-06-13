// 获取需要的部件
const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const NuxtConf = require('../models/nuxt-conf');

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

router.get('/List', (req, res, next) => {
  NuxtConf.findOne({},'class', (err, doc) => {
    if (err) {
      getWrong(res, err);
    } else {
      getRight(res, doc);
    }
  });
});

// 暴露结果
module.exports = router;
