var http = require('http')
var announce = require('project-discovery-announce')('http://localhost:3000/announce')

var port = process.env.PORT || 8080
var hostname = '127.0.0.1'

var server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Test Instance');
    console.log('HTTP Request')
})

server.listen(port, hostname, () => {
    console.log(`${hostname}:${port} ready.`)
    announce.up({'title': 'Test Site A', 'hostname': hostname, 'port': port, 'url': 'anExampleURL'})
})
