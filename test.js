var tape = require('tape')
var through = require('through2')
var ps = require('./')

// requires docker running

tape('works', function(t) {
  ps(function(err, list) {
    t.notOk(err, 'no err')
    t.ok(Array.isArray(list), 'returns list')
    t.end()
  })
})

tape('streams', function(t) {
  var s = ps()

  s.pipe(through.obj()).on('finish', function() {
    t.ok(true, 'ends')
    t.end()
  })
})