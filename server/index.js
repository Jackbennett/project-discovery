const express = require('express')
var app = express()

const bodyParser = require('body-parser')
const os = require('os')
const announce = require('project-discovery-announce')
const http = require('http').Server(app)
const io = require('socket.io')(http)

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public/'))
app.use(bodyParser.urlencoded({
  extended: false
}))

var projects = []

app.post('/announce', function(req,res){
  if (!req.body) return res.sendStatus(400)
  console.log(`Project announced from: ${req.body.url}`)
  console.log(req.body)
  projects.push(req.body)
  io.emit('new', req.body)
})

io.on('connection', con =>{
  io.to(con.id).emit('list projects', projects)

  console.log(con.id)
})

io.on('disconnect', con =>{
  io.emit('down', { id: con.id, up: false})
  console.log('client disconnect')
})

http.listen(port, function(){
  console.log(`Listening on ${os.hostname()}:${port}`)
  announce.up(os.hostname(), port, 'Discovery Server')
})
