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

  if(data.state === "false" || data.state === false){
    data.state = false
  } else {
    data.state = true
  }

  var service = {
    url: data.url
    , hostname: data.hostname
    , state: data.state
    , title: data.title
  }
  return service
}

app.post('/announce', function (req, res) {
  if (!req.body) return res.sendStatus(400)

  var project = parseService(req.body)
  projects.push(project)
  io.emit('new', project)
})

app.put('/announce', function (req, res) {
  if (!req.body) return res.sendStatus(400)
  var project = parseService(req.body)

  projects.forEach((existing, index) => {
    if(existing.url.toLowerCase() === project.url.toLowerCase()){
      projects[index] = project
    }
  })

  io.emit('down', project)
})

io.on('connection', con => {
  io.to(con.id).emit('allProjects', projects)

  console.log(`${con.id} Connected`)
})

io.on('disconnect', con => {
  console.log(`${con.id} Disconnect`)
})

http.listen(port, function () {
  console.log(`Listening on ${os.hostname()}:${port}`)
})
