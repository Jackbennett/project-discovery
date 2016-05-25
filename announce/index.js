const http = require('http')
const querystring = require('querystring');
const os = require('os')

function up(status){
  var postData = querystring.stringify({
    'url' : os.hostname().toString() + ':' + 3000,
    'online': status
  });

  var options = {
    hostname: 'itspc02',
    port: 3000,
    path: '/announce',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

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

function down(){}

module.exports = {announce, close}