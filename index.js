var docker = require('docker-remote-api')
var collect = require('stream-collector')
var through = require('through2')
var JSONStream = require('JSONStream')
var pump = require('pump')

var map = function(ports) {
  if (!ports || ports.length === 0) return null
  var res = {}
  ports.forEach(function(p) {
    res[p.PublicPort] = p.PrivatePort
  })
  return res
}

var ps = function(opts, cb) {
  if (typeof opts === 'function') return ps(null, opts)
  if (!opts) opts = {}

  var request = docker(opts.host, {version:'v1.15'})
  var format = function(c) {
    return {
      id: c.Id,
      created: new Date(1000*c.Created),
      image: c.Image,
      names: c.Names,
      ports: map(c.Ports),
      status: c.Status,
      running: !/^Exited /i.test(c.Status)
    }
  }

  var qs = {}
  if (opts.all) qs.all = '1'

  if (cb) {
    request.get('/containers/json', {json:true, qs:qs}, function(err, containers) {
      if (err) return cb(err)
      cb(null, containers.map(format))
    })
    return
  }

  var result = through.obj(function(data, enc, cb) {
    cb(null, format(data))
  })

  result.on('close', function() {
    request.destroy()
  })

  request.get('/containers/json', {qs:qs}, function(err, response) {
    if (err) return result.destroy()
    pump(response, JSONStream.parse('*'), result)
  })

  return result
}

module.exports = ps