var NestedModel = require('./NestedModel'),
    TableRows = require('./TableRows'),
    Backbone = require('backbone');

var DataTable = NestedModel.extend({
   template: {
      'rows': TableRows,
      'column': Backbone.Model
   },

   columnSpec: function() {
      return [];
   },

   parse : function(response){
      return this._super( { 'rows': response, 'column': this.columnSpec() } );
   }
});

module.exports = DataTable;
