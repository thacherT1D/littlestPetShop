'use strict';
const routes = {
  '/pets': (req, res) => {
    res.end('You got this');
  },

  '/pets/0': (req, res) => {
    res.end('You are BORING!');
  },
};

module.exports = routes;
