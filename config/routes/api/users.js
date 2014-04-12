module.exports = (function() {
  'use strict';

  var extend     = require('extend')

  return {
    index: function(req,res) {
      req.end('Users index')
    },
    show: function(req,res) {
      
      res.send({status: 200, code: 'ok', data: {name: 'Nhanderekó', id: '1', missions: [{id: 1, title: 'Testing', status: 'done'}] }} )
    },
  }
})();