# docker-ps

Docker ps from node

```
npm install docker-ps
```

## Usage

``` js
var ps = require('docker-ps')

ps(function(err, containers) {
  console.log(containers)
})

// or as a stream

var stream = ps()

stream.on('data', function(container) {
  console.log(container) // print container
})

stream.on('end', function() {
  console.log('no more')
})
```

## Command line tool

There is also a command line tool available

```
npm install -g docker-ps
docker-ps # prints a process listing
docker-ps --help # print a help message
```

## License

MIT
