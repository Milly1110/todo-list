//引用Express與Express路由器
const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.post('/', (req, res) => {
  const name = req.body.name  //從req.body拿出new.hbs表單裡的name資料
  return Todo.create({ name })  //存入資料庫
    .then(() => res.redirect('/'))  //新增完成後導回首頁
    .catch(error => console.log(error))  //錯誤處理
})
//設定新增todo的路由
router.get('/new', (req, res) => {
  return res.render('new')
})
//設定detail的路由
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)  //從資料庫查找出資料
    .lean()  //把資料轉換成單純的JS物件
    .then(todo => res.render('detail', { todo }))  //把資料送給前端樣板(detail.hbs)
    .catch(error => console.log(error))  //錯誤處理
})
//設定edit的路由
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)  //從資料庫查找資料
    .lean()  //把資料轉換成單純的JS物件
    .then(todo => res.render('edit', { todo }))  //把資料傳送給前端樣板(edit.hbs)
    .catch(error => console.log(error))  //錯誤處理
})
router.put('/:id', (req, res) => {
  const id = req.params.id  //資料來自客戶端，id要從網址上取下
  // const name = req.body.name  //資料來自客戶端，name要從表單拿出來
  const { name, isDone } = req.body  //解構賦值；將物件屬性分別取出存成變數
  return Todo.findById(id)  //查詢資料
    .then(todo => {   //查詢成功，修改後重新儲存資料
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))  //儲存成功，導向首頁
    .catch(error => console.log(error))  //錯誤處理
})
//設定delete的路由
router.delete('/:id', (req, res) => {
  const id = req.params.id  //取得網址上的識別碼
  return Todo.findById(id)  //資料庫查詢成功後，把資料放進todo
    .then(todo => todo.remove())  //刪除這筆資料
    .then(() => res.redirect('/'))  //成功刪除以後，重新呼叫首頁
    .catch(error => console.log(error))
})
module.exports = router