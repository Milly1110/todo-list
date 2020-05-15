const db = require('../../config/mongoose')

const Todo = require('../todo')

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 5; i++) {
    Todo.create({ name: 'name-' + i })
  }
  console.log('done')
})