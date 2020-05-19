// include packages and define server related variables
const express = require('express')
const bodyParser = require('body-parser')

const exphbs = require('express-handlebars')  //引用express-handlebars並命名為exphbs
const Todo = require('./models/todo') //載入Todo model
const methodOverride = require('method-override')  //載入method-override
const routes = require('./routes')
require('./config/mongoose') //連線只要被執行，所以不需要設定變數
const app = express()
const PORT = process.env.PORT || 3000 //如果在Heroku環境則使用process.env.PORT，在本地環境則使用3000

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))  //建立一個名為hbs的樣板引擎並傳入exphbs與相關參數
app.set('view engine', 'hbs')  //啟用樣板引擎hbs

//用app.use規定每一筆請求都需要透過body-parser進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

//用app.use讓每一筆路由都會透過method-override進行前置處理
app.use(methodOverride('_method'))

//將request導入路由器
app.use(routes)



// setting routes


// starts the express server and listening for conections
app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})