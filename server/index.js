const express = require('express')
var app = express()

const bodyParser = require('body-parser')
const os = require('os')
const http = require('http').Server(app)
const io = require('socket.io')(http)

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public/'))
app.use(bodyParser.urlencoded({
  extended: false
}))

var projects = []

function parseService(data){
  if(!data.url){
    data.url = `http://${data.hostname}:${data.port}/`
  }

  if(!data.title){
    data.title = data.hostname
  }

  var service = {
    url: data.url
    , hostname: data.hostname
    , state: true
    , title: data.title
  }
  return service
}

app.post('/announce', function (req, res) {
  if (!req.body) return res.sendStatus(400)
  console.log(`Project announced from: ${req.body.url}`)

  var project = parseService(req.body)
  console.log(project)
  projects.push(project)
  io.emit('new', project)
})

app.put('/announce', function (req, res) {
  if (!req.body) return res.sendStatus(400)
  console.log(`server: Project down from: ${req.body.url}`)
  io.emit('down', req.body)
})

io.on('connection', con => {
  io.to(con.id).emit('allProjects', projects)

  console.log(con.id)
})

io.on('disconnect', con => {
  console.log('client disconnect')
})

http.listen(port, function () {
  console.log(`Listening on ${os.hostname()}:${port}`)
})