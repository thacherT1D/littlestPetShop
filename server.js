'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const pets;
const http = require('http');

fs.readFile(petsPath, 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  pets = JSON.parse(data);
});

var handleRequest = (req, res) => {
  // res.setHeader("Content-Type", "text/plain");
  // res.end("Hi, I'll take two packets of sugar");
  if (req.url === '/pets') {
    res.statusCode = 200;
    res.end(JSON.stringify(pets));
  }
  else if (req.url === '/pets/0') {
    // res.end('/pets/0');
    res.end(JSON.stringify(pets[0]));
  }
  else if (req.url === '/pets/1') {
    // res.end('/pets/1');
    res.end(JSON.stringify(pets[1]));
  }
  else if (req.url === '/pets/2') {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 404;
    res.end('Not Found');
  }
  else if (req.url === '/pets/-1') {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 404;
    res.end('Not Found');
  }
  else {
    res.end(req.url);
  }
};

const server = http.createServer(handleRequest);

const port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log('Listening...');

});
