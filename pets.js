'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];
let petAge2 = 0;

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const pets = JSON.parse(data);
    const index = process.argv[3];

    if (!index) {
      console.log(pets);
      process.exit(1);
    } else if (index >= 0 && index < pets.length) {
      console.log(pets[index]);
    } else {
      console.error(`Usage: ${node} ${file} read INDEX`);
      process.exit(1);
    }
  });
} else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) {
      throw readErr;
    }
    const pets = JSON.parse(data);
    const petAge = process.argv[3];
    const petKind = process.argv[4];
    const petName = process.argv[5];

    if (!petAge || !petKind || !petName) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }

    petAge2 = parseInt(petAge, 10);
    pets.push({ age: petAge2, kind: petKind, name: petName });

    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
    });
  });
} else if (cmd === 'update') {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) {
      throw readErr;
    }
    const pets = JSON.parse(data);
    const index = process.argv[3];
    const petAge = process.argv[4];
    const petKind = process.argv[5];
    const petName = process.argv[6];

    if ((!index || !petAge || !petKind || !petName) || ((index >= 0 && index < pets.length) !== true)) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }
    petAge2 = parseInt(petAge, 10);
    pets[index] = ({ age: petAge2, kind: petKind, name: petName });
    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
      console.log(pets);
    });
  });
} else if (cmd === 'destroy') {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) {
      throw readErr;
    }
    const pets = JSON.parse(data);
    const index = process.argv[3];

    if (!index || ((index >= 0 && index < pets.length) !== true)) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }

    pets.splice(index, 1);
    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
    });
  });
} else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
