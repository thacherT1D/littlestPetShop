'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
let pets = [];
const http = require('http');

const handleRequest = (req, res) => {
  const petRegExp = /^\/pets\/(.*)$/;
  const matches = req.url.match(petRegExp);

  fs.readFile(petsPath, 'utf8', (err, data) => {
    pets = JSON.parse(data);

    if (req.url === '/pets' && req.method === 'POST') {
      if (err) {
        throw err;
      }
      // console.log(data);

      let body = '';
      req.on('data', function (chunk) {
        body += chunk.toString();
      });
      req.on('end', () => {
        if(body !== '') {
          req.body = JSON.parse(body);
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        pets.push(req.body);

        const petsString = JSON.stringify(pets);

        fs.writeFile(petsPath, petsString, (err, data) => {
          if (err) {
            throw err;
          }
          else {
            res.end(JSON.stringify(pets));
          }
        })
      });
    }

    else if (req.url === '/pets' && req.method === 'GET') {
      res.statusCode = 200;
      res.end(JSON.stringify(pets));
    }
    else if (matches) {
      const id = matches[1];
      if (id >= 0 && id < pets.length) {
        res.statusCode = 200;
        res.end(JSON.stringify(pets[id]));
      } else {
        res.statusCode = 404;
        res.end('No Pet At that ID');
      }
    }
    else {
      res.statusCode = 404;
      res.end('Not Found');
    }
  });
}

const server = http.createServer(handleRequest);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log('Listening...');
});
