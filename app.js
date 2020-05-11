// include packages and define server related variables
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const exphbs = require('express-handlebars') //引用express-handlebars並命名為exphbs


// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))  //建立一個名為hbs的樣板引擎並傳入exphbs與相關參數
app.set('view engine', 'hbs')  //啟用樣板引擎hbs

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
  res.render('index')
})
// starts the express server and listening for conections
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})