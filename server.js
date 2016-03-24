'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const morgan = require('morgan');
app.use(morgan('short'));

fs.readFile(petsPath, 'utf8', (err, data) => {
  const pets = JSON.parse(data);

  app.get('/pets', (req, res) => {
    res.send(pets);
  });

  app.get('/pets/:id', (req, res) => {
    const givenId = req.params.id;
    if (givenId >= 0 && givenId < pets.length) {
      const currentPet = pets[givenId];
      res.status(200);
      res.send(currentPet);
    } else {
      res.status(404);
      res.send('Not found');
    }
  });

  app.post('/pets', (req, res) => {
    if (!(req.body.age) || !(req.body.kind) || !(req.body.name) || !(Number.isInteger(parseInt(req.body.age)))) {
      res.status(400);
      res.send('Bad Request');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');

      const newAnimal = {
        age: parseInt(req.body.age),
        kind: req.body.kind,
        name: req.body.name,
      };

      pets.push(newAnimal);
      res.send(newAnimal);
    }

    const petsString = JSON.stringify(pets);

    fs.writeFile(petsPath, petsString, (err, data) => {
      if (err) {
        throw err;
      } else {
        res.send(petsString);
      }
    });
  });

  app.put('/pets/:id', (req, res) => {
    var id = Number.parseInt(req.params.id);

    if (Number.isNaN(id) || id < 0 || id >= pets.length) {
      return res.sendStatus(404);
    }

    if (!(req.body.age) || !(req.body.kind) || !(req.body.name) || !(Number.isInteger(parseInt(req.body.age)))) {
      res.status(400);
      res.send('Bad Request');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');

      const newAnimal = {
        age: parseInt(req.body.age),
        kind: req.body.kind,
        name: req.body.name,
      };
      pets[id] = newAnimal;
      res.send(newAnimal);
    }

    const petsString = JSON.stringify(pets);

    fs.writeFile(petsPath, petsString, (err, data) => {
      if (err) {
        throw err;
      } else {
        res.send(petsString);
      }
    });
  });

  app.delete('/pets/:id', (req, res) => {
    var id = Number.parseInt(req.params.id);

    if (Number.isNaN(id) || id < 0 || id >= pets.length) {
      return res.sendStatus(404);
    }

    const pet = pets.splice(id, 1)[0];
    res.send(pet);

    const petsString = JSON.stringify(pets);

    fs.writeFile(petsPath, petsString, (err, data) => {
      if (err) {
        throw err;
      } else {
        res.send(petsString);
      }
    });
  });

  app.patch('/pets/:id', (req, res) => {
    var id = Number.parseInt(req.params.id);

    if (Number.isNaN(id) || id < 0 || id >= pets.length) {
      return res.sendStatus(404);
    }

    if (req.body.age && (Number.isInteger(parseInt(req.body.age)))) {
    pets[id].age = parseInt(req.body.age);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.send(req.body.age);
    }
    else if (req.body.kind) {
      pets[id].kind = req.body.kind;
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.send(req.body.age);
    }

    else if (req.body.name) {
      pets[id].name = req.body.name;
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.send(req.body.age);
    }

    else{
      res.status(400);
      res.send('Bad Request');
    }

    const petsString = JSON.stringify(pets);

    fs.writeFile(petsPath, petsString, (err, data) => {
      if (err) {
        throw err;
      } else {
        res.send(petsString);
      }
    });
  });

});



app.listen(5000, () => {
  console.log('Go to localhost:5000/');
});


// app.use(function(err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });
