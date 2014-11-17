#!/usr/bin/env node

var ps = require('./')
var minimist = require('minimist')
var table = require('text-table')
var fs = require('fs')

var argv = minimist(process.argv, {
  alias: {long:'l', all:'a', host:'H'}
})

if (argv.help) {
  console.log(fs.readFileSync(__dirname+'/help.txt', 'utf-8'))
  process.exit(0)
}

if (argv.version) {
  console.log(require('./package').version)
  process.exit(0)
}

ps(argv, function(err, containers) {
  var rows = []
  rows.push(['ID', 'IMAGE', 'COMMAND', 'STATUS'])
  containers.forEach(function(c) {
    rows.push([argv.long ? c.id : c.id.slice(0, 12), c.image, c.command.replace(/^\/bin\/sh -c '(.+)'$/, '$1'), c.status])
  })
  console.log(table(rows))
})