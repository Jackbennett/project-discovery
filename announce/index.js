const http = require('http')
const querystring = require('querystring');
const url = require('url')
const os = require('os')
const _ = require('lodash')

module.exports = function(target){
  var module = {}
  var project = {}

  if(!target){
    throw new Error('Missing target server for announcement')
  }

  var server = url.parse(target)
  if( ! server.protocol.match(/https?:/i) ){
    throw new Error('URL to endpoint looks malformed')
  }

  var request = function(method, data, cb) {
    var cb = cb || function(){}
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

    var req = http.request(options, (res) => {
      res.setEncoding('utf8')
    });

    req.on('error', (e) => {
      console.log(`problem with request: ${e.message}`)
      cb()
    });

    // we don't care to get a response at all but short to timeout to lessen hanging at exit
    req.setTimeout(500)

    req.write(postData)

    req.end(function(){ cb() });
  }

  var exitHandler = function(options, err) {
    process.stdin.resume(); //so the program will not close instantly
    project.state = false
    request('put', project, process.exit)
  }

  module.up = function(from){
    var port = parseInt(process.env.PORT || 3000)
    
    project = _.defaults(from, {
      port: port,
      hostname: os.hostname(),
    })
    project.state = true
    request('post', project)
    return project
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
