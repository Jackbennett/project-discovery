const http = require('http')
const querystring = require('querystring');
const url = require('url')
const os = require('os')
const _ = require('lodash')

module.exports = function(target){
  var module = {}
  var project = {}
  
  if(!target){
    throw 'Missing target server for announcement'
  }

  var server = url.parse(target)

  var request = function(method, data, cb) {
    var cb = cb || function(){}
    console.log(`HTTP: ${method}`)
    var postData = querystring.stringify(data)

    var options = {
      hostname: server.hostname,
      port: server.port,
      path: server.path,
      method: method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }
    }

    console.log(data)

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
      cb()
    });
    req.setTimeout(500)

    req.write(postData)

    req.end(function(){ cb() });
  }

  var exitHandler = function(options, err) {
    process.stdin.resume(); //so the program will not close instantly
    console.log('exit type: ' + options.type)

    request('put', project, process.exit)
  }

  module.up = function(from){
    var port = parseInt(process.env.PORT || 3000)
    
    project = _.defaults(from, {
      port: port,
      hostname: os.hostname()
    })

    request('post', project)
  }

  //do something when app is closing
  process.on('exit', exitHandler.bind(null, {
    type: 'cleanup'
  }));
  //catches ctrl+c event
  process.on('SIGINT', exitHandler.bind(null, {
    type: 'sigint'
  }));
  //catches uncaught exceptions
  process.on('uncaughtException', exitHandler.bind(null, {
    type: 'uncaughtException'
  }));

  return module
}


