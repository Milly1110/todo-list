// 引用Express與Express路由器
const express = require('express')
const router = express.Router()

//準備引入路由模組
//總路由器設定home模組
const home = require('./modules/home')
router.use('/', home)
//總路由器設定todos模組
const todos = require('./modules/todos')
router.use('/todos', todos)
//匯出路由器
module.exports = router