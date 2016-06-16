const http = require('http')
const querystring = require('querystring');
const url = require('url')
const os = require('os')
const _ = require('lodash')

function up(from, to) {

  var to = to || `http://${os.hostname()}`

  //  if (http.address) {
  //    var port = http.address().port
  //  }

  _.defaults(from, {
    port: parseInt(process.env.PORT || 3000),
    url: guessUrl(),
    name: os.hostname()
  })

  _.defaults(to, getAPI())

  function guessUrl() {
    // Create the address of the project to advertise
    var prefix = from.port === 443 ? 'https' : 'http'
    return `${prefix}://${os.hostname()}:${from.port}`.replace(/:80$|:443$/, '/')
  }

  function getAPI() {
    return url.parse(to || process.env.NODE_ORG_API)
  }

  var postData = querystring.stringify(from)

  var options = {
    path: '/announce',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  }
  _.defaults(options, to)

  var req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });

    res.on('end', () => {
      console.log('No more data in response.')
    })
  });

  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });

  // write data to request body
  req.write(postData);
  req.end();
}

function down(from, to) {
  var to = to || `http://${os.hostname()}`

  if (http.address) {
    var port = http.address().port
  }
  var defFrom = {
    port: parseInt(port || process.env.PORT || 3000)
  }
  _.defaults(from, defFrom, {
    url: guessUrl(),
    name: os.hostname()
  })

  _.defaults(to, getAPI())

  function guessUrl() {
    // Create the address of the project to advertise
    var prefix = defFrom.port === 443 ? 'https' : 'http'
    return `${prefix}://${os.hostname()}:${defFrom.port}`.replace(/:80$|:443$/, '/')
  }

  function getAPI() {
    return url.parse(to || process.env.NODE_ORG_API)
  }

  var postData = querystring.stringify(from)

  var options = {
    path: '/announce',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  }
  _.defaults(options, to)

  var req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });

    res.on('end', () => {
      console.log('No more data in response.')
    })
  });

  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });

  // write data to request body
  req.write(postData);
  req.end();
}

process.stdin.resume(); //so the program will not close instantly

function exitHandler(options, err) {
  console.log('PUT close message for URL')
  down()
  if (options.cleanup) console.log('clean');
  if (err) console.log(err.stack);
  if (options.exit) process.exit();
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