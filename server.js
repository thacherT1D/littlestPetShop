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
  const petRegExp = /^\/pets\/(.*)$/;
  const matches = req.url.match(petRegExp);

  if (req.url === '/pets' && req.method === 'POST') {
    let body = [];
    req.on('data', (chunk) => {
    body.push(chunk);
    // console.log(`BODY: ${chunk}`);
  }).on('end',() => {
    body = Buffer.concat(body).toString();
    body = JSON.parse(body);
    pets.push(body);
    const petsString = JSON.stringify(pets);

    fs.writeFile(petsPath, petsString, (err, data) => {
      if (err) {
        throw err;
      }
    })
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(body));
  })

    console.log("post request made");
    console.log(process.argv);
    console.log(req.data);
    res.end("JSON.stringify(pets)");

  }

  else if (req.url === '/pets' && req.method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify(pets));
    // console.log(req.method);
    // console.log(req.body);
  } else if (matches) {
    const id = matches[1];
    if (id >= 0 && id < pets.length) {
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
