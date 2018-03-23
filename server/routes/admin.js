// 获取需要的部件
const express = require('express')

const router = express.Router()
const mongoose = require('mongoose')
const Admin = require('../models/admin')

// 链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/graduationProject')

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected success.');
})

mongoose.connection.on('error', () => {
  console.log('MongoDB connected fail.')
})

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connected disconnected.')
})

// 获取路由
router.get('/', (req, res) => {
  Admin.find({}, (err, doc) => {
    if (err) {
      res.json({
        status: 1,
        msg: err.message,
      })
    } else {
      res.json({
        status: 0,
        msg: '',
        result: {
          count: doc.length,
          list: doc,
        },
      })
    }
  })
})

// 注册管理员
router.post('/createAdmin', (req, res) => {
  const param = {
    fullAuthority: req.body.fullAuthority,
    userId: 10011,
    userType: req.body.userType,
  }
  Admin.create(param, (err, doc) => {
    if (err) {
      res.json({
        status: 1,
        msg: err.message,
        result: '',
      })
    } else {
      res.json({
        status: 0,
        msg: '',
        result: doc,
      })
    }
  })
})
// 暴露结果
module.exports = router

