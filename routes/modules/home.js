//引用Express與Express路由器
const express = require('express')
const router = express.Router()

//引用Todo model
const Todo = require('../../models/todo')

//定義首頁路由
router.get('/', (req, res) => {
  Todo.find()  //取出Todo model裡的所有資料
    .lean()  //把mongoose的model物件轉換成JavaScript資料陣列
    .sort({ _id: 'desc' })  //正序為asc,反序為desc
    .then(todos => res.render('index', { todos }))  //將資料傳給index樣板
    .catch(error => console.log(error))  //錯誤處理
  // res.render('index')
})

//匯出路由模組
module.exports = router