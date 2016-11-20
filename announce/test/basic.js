const tap = require('tap')

tap.pass('tap is running fine.')
tap.throws(() => { require('../index.js')() }, {}, 'Throw some error if an endpoint hasn\'t been passed')
tap.doesNotThrow(() => { require('../index.js')('http://example.com/announce') }, {}, 'No error with a proper URL and path')
tap.throws(() => { require('../index.js')('invalidURL') }, {}, 'Error if the endpoint is unrecognizable')
