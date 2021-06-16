const express = require('express')
const app = express()

const port = process.env.PORT || 3001;

app.use(express.static( "www"));


app.get('/', (req,res)=> {
  res.sendFile('index.html');
})

app.get('/nl', (req,res)=> {
  res.sendFile(__dirname + '/www/www_NL/index.html');
})

app.get('/fr', (req,res)=> {
 
  res.sendFile(__dirname + '/www/www_FR/index.html');
  
})



app.get('/ar', (req,res)=> {
  res.sendFile('index.html');
})

app.listen(port, () => {
  console.log('server ready')
})