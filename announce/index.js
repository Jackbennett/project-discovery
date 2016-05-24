const http = require('http')
const os = require('os')

var exports = {}

var notify = function(status){
  var options = {
    hostname: 'internal.birkdalehigh.club',
    port: 80,
    path: '/announce',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  var postData = querystring.stringify({
    'url' : os.hostname().toString() + 3000,
    'online': status
  });

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

exports.announce = notify(true)
exports.close = notify(false)

module.exports = exports