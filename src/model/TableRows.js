var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var TableRows = Backbone.Model.extend({
   parse : function(response, options){
      console.log("TableRows: ");
      console.log(response);
      return response;
   }
});

module.exports = TableRows;
