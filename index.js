const express = require('express')
const app = express()

app.use(express.static( "www"));

app.get('/', (req,res)=> {
  res.sendFile('index.html');
})



app.get('/ar', (req,res)=> {
  res.sendFile('index.html');
})

app.listen(process.env.PORT || 3000, () => console.log('server ready'))