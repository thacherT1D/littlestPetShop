'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', function (err, data) {
    if (err) {
      throw err;
    }
    var pets = JSON.parse(data);
    var index = process.argv[3];

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
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }
    var pets = JSON.parse(data);
    var petAge = process.argv[3];
    var petKind = process.argv[4];
    var petName = process.argv[5];

    if (!petAge || !petKind || !petName) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }
<<<<<<< HEAD
    petAge = parseInt(petAge, 10);
    pets.push({ age: petAge, kind: petKind, name: petName });
=======
    petAge = parseInt(petAge,10);
    pets.push({age: petAge, kind: petKind, name: petName});
>>>>>>> 7cc75dfad2683cb56621486f7b584c033314820b
    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function (writeErr) {
      if (writeErr) {
        throw writeErr;
      }
<<<<<<< HEAD
    });
  });
} else if (cmd === 'update') {
  fs.readFile(petsPath, 'utf8', function (readErr, data) {
=======
    console.log(pets);
    });
  });
}
else if (cmd === 'update') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
>>>>>>> 7cc75dfad2683cb56621486f7b584c033314820b
    if (readErr) {
      throw readErr;
    }
    var pets = JSON.parse(data);
    var index = process.argv[3];
    var petAge = process.argv[4];
    var petKind = process.argv[5];
    var petName = process.argv[6];
<<<<<<< HEAD

    if ((!index || !petAge || !petKind || !petName) || ((index >= 0 && index < pets.length) !== true)) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }
    petAge = parseInt(petAge, 10);
    pets[index] = ({ age: petAge, kind: petKind, name: petName });
    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function (writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      console.log(pets);
    });
  });
} else if (cmd === 'destroy') {
  fs.readFile(petsPath, 'utf8', function (readErr, data) {
    if (readErr) {
      throw readErr;
    }
    var pets = JSON.parse(data);
    var index = process.argv[3];

    if (!index) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }

    pets.splice(index, 1);
    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function (writeErr) {
      if (writeErr) {
        throw writeErr;
      }
    });
  });
} else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
=======

    if ((!index || !petAge || !petKind || !petName) || ((index >= 0 && index < pets.length) !== true))  {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }
    petAge = parseInt(petAge,10);
    // console.log(pets[index]);
    // pets[index] = {age: petAge, kind: petKind, name: petName,}
    // console.log(pets[index]);

    pets[index] = ({age: petAge, kind: petKind, name: petName});
    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
    console.log(pets);
    });
  });
}
else {
  console.error(`Usage: ${node} ${file} [read | create | update]`);
>>>>>>> 7cc75dfad2683cb56621486f7b584c033314820b
  process.exit(1);
}
