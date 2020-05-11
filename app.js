// include packages and define server related variables
const express = require('express')
const app = express()
const port = 3000
// setting template engine
// setting routes
app.get('/', (req, res) => {
  res.send('Welcome')
})
// starts the express server and listening for conections
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})