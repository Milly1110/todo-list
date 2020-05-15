// include packages and define server related variables
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')  //引用express-handlebars並命名為exphbs
const Todo = require('./models/todo') //載入Todo model


// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))  //建立一個名為hbs的樣板引擎並傳入exphbs與相關參數
app.set('view engine', 'hbs')  //啟用樣板引擎hbs

//用app.use規定每一筆請求都需要透過body-parser進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

//setting link to mongoDB
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true }) //設定連線到mongoDB
const db = mongoose.connection //取得資料庫連線狀態
//連線失敗
db.on('error', () => {
  console.log('mongodb error!')
})
//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// setting routes
app.get('/', (req, res) => {
  Todo.find()  //取出Todo model裡的所有資料
    .lean()  //把mongoose的model物件轉換成JavaScript資料陣列
    .sort({ _id: 'desc' })  //正序為asc,反序為desc
    .then(todos => res.render('index', { todos }))  //將資料傳給index樣板
    .catch(error => console.log(error))  //錯誤處理
  // res.render('index')
})
app.post('/todos', (req, res) => {
  const name = req.body.name  //從req.body拿出new.hbs表單裡的name資料
  return Todo.create({ name })  //存入資料庫
    .then(() => res.redirect('/'))  //新增完成後導回首頁
    .catch(error => console.log(error))  //錯誤處理
})
//設定新增todo的路由
app.get('/todos/new', (req, res) => {
  return res.render('new')
})
//設定detail的路由
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)  //從資料庫查找出資料
    .lean()  //把資料轉換成單純的JS物件
    .then(todo => res.render('detail', { todo }))  //把資料送給前端樣板(detail.hbs)
    .catch(error => console.log(error))  //錯誤處理
})
//設定edit的路由
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)  //從資料庫查找資料
    .lean()  //把資料轉換成單純的JS物件
    .then(todo => res.render('edit', { todo }))  //把資料傳送給前端樣板(edit.hbs)
    .catch(error => console.log(error))  //錯誤處理
})
app.post('/todos/:id/edit', (req, res) => {
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
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id  //取得網址上的識別碼
  return Todo.findById(id)  //資料庫查詢成功後，把資料放進todo
    .then(todo => todo.remove())  //刪除這筆資料
    .then(() => res.redirect('/'))  //成功刪除以後，重新呼叫首頁
    .catch(error => console.log(error))
})

// starts the express server and listening for conections
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})