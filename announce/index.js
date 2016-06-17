const http = require('http')
const querystring = require('querystring');
const url = require('url')
const os = require('os')
const _ = require('lodash')

var currentProject


function up(from, to) {
  var port = parseInt(process.env.PORT || 3000)
  _.defaults(from, {
    port: port,
    url: guessUrl(from.port || port),
    name: os.hostname()
  })

  _.defaults(to, {
    hostname: os.hostname(),
    port: 3000
  })

  currentProject = from

  request('post', currentProject)
}

function down() {
  request('put', currentProject, true)
}

function guessUrl(data) {
  // Create the address of the project to advertise
  var prefix = data === 443 ? 'https' : 'http'
  return `${prefix}://${os.hostname()}:${data}`.replace(/:80$|:443$/, '/')
}

function request(method, data, exit) {
  console.log(`HTTP: ${method} about ${data.url}`)
  var postData = querystring.stringify(data)

  var options = {
    hostname: 'ITSPC02',
    port: 3000,
    path: '/announce',
    method: method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  }

  var req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
    res.setEncoding('utf8')

    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`)
    });

    res.on('end', () => {
      console.log('No more data in response.')
    })
  });

  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`)
  });
  req.setTimeout(500)
    // write data to request body
  req.write(postData);
  req.end(() => {
    if (exit) process.exit()
  });
}

process.stdin.resume(); //so the program will not close instantly

function exitHandler(options, err) {
  console.log('announce: PUT for URL')
  down()
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, {
  cleanup: true
}));
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {
  exit: true
}));
//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {
  exit: true
}));

module.exports = {
  up, down
}