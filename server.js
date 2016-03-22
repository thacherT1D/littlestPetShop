'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
let pets = [];
const http = require('http');

fs.readFile(petsPath, 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  pets = JSON.parse(data);
});

const handleRequest = (req, res) => {
  var petRegExp = /^\/pets\/(.*)$/;
  var matches = req.url.match(petRegExp);


  if (req.url === '/pets') {
    res.statusCode = 200;
    res.end(JSON.stringify(pets));
  } else if (matches) {
      var id = matches[1];
      if(id >= 0 && id < pets.length){
        res.statusCode = 200;
        res.end(JSON.stringify(pets[id]));
      } else {
        res.statusCode = 404;
        res.end('No Pet At that ID');
      }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
};

const server = http.createServer(handleRequest);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log('Listening...');
});
