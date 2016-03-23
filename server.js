const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const http = require('http');

fs.readFile(petsPath, 'utf8', (err, data) => {
  const pets = JSON.parse(data);
  console.log(pets);
  console.log(pets.length);

  app.get('/pets', (req, res) => {
    res.send(pets);
  });

  app.get('/pets/:id', (req, res) => {
    var givenId = req.params.id;
    if(givenId >= 0 && givenId < pets.length){
      var currentPet = pets[givenId];
      res.status(200);
      res.send(currentPet);
    }
    else {
      res.status(404);
      res.send('Not found');
    }
  });
});




app.listen(5000, function () {
  console.log("Go to localhost:5000/");
});

//////// below node version
//
//
//
//   fs.readFile(petsPath, 'utf8', (err, data) => {
//     pets = JSON.parse(data);
//
//     if (req.url === '/pets' && req.method === 'POST') {
//       if (err) {
//         throw err;
//       }
//       // console.log(data);
//
//       let body = '';
//       req.on('data', function (chunk) {
//         body += chunk.toString();
//       });
//       req.on('end', () => {
//         if(body !== '') {
//           req.body = JSON.parse(body);
//         }
//
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//
//         pets.push(req.body);
//
//         const petsString = JSON.stringify(pets);
//
//         fs.writeFile(petsPath, petsString, (err, data) => {
//           if (err) {
//             throw err;
//           }
//           else {
//             res.end(JSON.stringify(pets));
//           }
//         })
//       });
//     }
//
//     else if (req.url === '/pets' && req.method === 'GET') {
//       res.statusCode = 200;
//       res.end(JSON.stringify(pets));
//     }
//     else if (matches) {
//       const id = matches[1];
//       if (id >= 0 && id < pets.length) {
//         res.statusCode = 200;
//         res.end(JSON.stringify(pets[id]));
//       } else {
//         res.statusCode = 404;
//         res.end('No Pet At that ID');
//       }
//     }
//     else {
//       res.statusCode = 404;
//       res.end('Not Found');
//     }
//   });
// }
//
// const server = http.createServer(handleRequest);
//
// const port = process.env.PORT || 5000;
// server.listen(port, () => {
//   console.log('Listening...');
// });
