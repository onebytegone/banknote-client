var Backbone = require('backbone');

var TableRows = Backbone.Model.extend({
   parse : function(response, options){
      console.log("TableRows: ");
      console.log(response);
      return response;
   }
});

module.exports = TableRows;
