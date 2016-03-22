'use strict';
var routes = {
  '/pets': function(req, res) {
    res.end('You got this');
  },

  '/pets/0': function(req, res) {
    res.end('You are BORING!');
  }
};

module.exports = routes;
