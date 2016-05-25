const http = require('http')
const querystring = require('querystring');
const os = require('os')

function up(hostname,
            port = 80,
            name = os.hostname()){

  // Create the address of the project to advertise
  var advertisePort = parseInt(process.env.PORT || 3000)
  var prefix = advertisePort === 443 ? 'https://' : 'http://'
  var postData = querystring.stringify({
    'url' : `${prefix}${os.hostname().toString()}:${advertisePort.toString()}`
      .replace(/:80$|:443$/,''),
    'name': name
  });

  var options = {
    path: '/announce',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  }
  options.hostname = hostname
  options.port = port

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

module.exports = {up, down}
