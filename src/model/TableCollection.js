var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var DataTable = require('./DataTable');

var TableCollection = Backbone.Collection.extend({
   model: DataTable,
   url: 'demo.json',
   parse: function(response) {
      console.log("TableCollection: ");
      console.log(response);
      return response;
   }
});

module.exports = TableCollection;
