//USING AJAX??
// $(document).ready(function() {
//   'use strict';
//
//   $.ajax({
//     url: './pets',
//     method: 'GET',
//     success: function(data) {};
//   });
// });


var http = require('http');
// var routes = require('./routes');

var handleRequest = function(req, res) {
  // res.setHeader("Content-Type", "text/plain");
  // res.end("Hi, I'll take two packets of sugar");
  if(req.url === '/pets') {
    // res.setHeader("Content-Type", "application/json");
    // res.statusCode = 200;
    res.end("/pets");
  } else if (req.url === '/pets/0') {
    res.end('/pets/0');
  } else if (req.url === '/pets/1') {
    res.end('/pets/1');
  } else if (req.url === '/pets/2') {
    res.setHeader("Content-Type", "text/plain");
    res.statusCode = 404;
    res.end('Not Found');
  } else if (req.url === '/pets/-1') {
    res.setHeader("Content-Type", "text/plain");
    res.statusCode = 404;
    res.end('Not Found');
  } else {
    res.end(req.url);
  }

};

var server = http.createServer(handleRequest);

server.listen(8080, function() {
  console.log("Listening...");
});
