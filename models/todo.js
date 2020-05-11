const mongoose = require('mongoose')  //載入moongoose
const Schema = mongoose.Schema  //使用Mongoose提供的Schema模組
const todoSchema = new Schema({  //把想要的資料結構當成參數傳給new Schema
  name: {                 //每筆todo資料都有一個叫做name的屬性
    type: String,         //name屬性必須是字串
    required: true        //name是必填項目
  }
})
module.exports = mongoose.model('Todo', todoSchema)  //輸出Schema並且命名為Todo，以後在其他的檔案可以直接使用Todo操作和待辦事項有關的資料