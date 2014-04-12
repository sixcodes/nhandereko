module.exports = (function() {
  'use strict';

  var extend     = require('extend')

  return {
    index: function(req,res) {
      res.send({status: 200, code: 'ok', missions: [{id: 1, title: 'Testing', status: 'done'}]})
    },
    
    search: function(req,res){
      res.end('Missions search')
    }
  }
})();