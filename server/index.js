const express = require('express')
const os = require('os')
const port = process.env.PORT || 3000

var app = express()
app.use(express.static(__dirname + '/public/'))

app.listen(port, function(){
  console.log(`Listening on ${os.hostname()}:${port}`)
})
