routes = {
  '/pets' : function(req, res) {
    res.end("You got this");
  },

  '/pets/0' : function(req, res) {
    res.end("You're BORING!");
  }
};

module.exports = routes;
