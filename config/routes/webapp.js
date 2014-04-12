module.exports = (function() {
  'use strict';

  var extend     = require('extend')

  return {
    contact: {
      create: function(req,res) {
        res.end('Creating contact');
      }
    },
    index: function(req,res) {
      return res.render('webapp/index');
    }
  }
})();