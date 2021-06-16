const express = require('express')
const app = express()

const port = process.env.PORT || 3001;

app.use(express.static('public', {
  extensions: ['html']
}))

app.get('/', (req, res) => {
  res.redirect('/nl/index')
})

app.listen(port, () => {
  console.log('server ready')
})