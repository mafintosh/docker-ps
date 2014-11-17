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

## License

MIT
