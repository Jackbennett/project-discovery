const tap = require('tap')
const rewire = require('rewire')
const os = require('os')

const announce = require('../index.js')('http://example.com')

tap.test('setup', function(t){
    t.end()
})

tap.type(announce.up(), 'object', 'Calling up() returns the message that was posted')
tap.same(announce.up(), {
    'title': 'example',
    'url': 'http://example.com:8080/'
}, 'Default parameters generate the correct values', {todo: true})

// var private = rewire('../index.js')
// tap.type( private.__get__('guessName'), 'function', 'should be a function')
// tap.type( announce.guessName , 'undefined', 'function should be private')
// tap.equals( private.__get__('guessName')(), 'found me', 'ran function')
