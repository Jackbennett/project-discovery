const express = require('express')
const bodyParser = require('body-parser')
const os = require('os')
const announce = require('project-discovery-announce')

const port = process.env.PORT || 3000

var app = express()
app.use(express.static(__dirname + '/public/'))
app.use(bodyParser.urlencoded({
  extended: false
}))

app.post('/announce', function(req,res){
  if (!req.body) return res.sendStatus(400)
  console.log(`Project announced from: ${req.body.url}`)
  console.log(req.body)
})

app.listen(port, function(){
  console.log(`Listening on ${os.hostname()}:${port}`)
  announce.up(os.hostname(), port)
})
