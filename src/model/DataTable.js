var NestedModel = require('./NestedModel'),
    TableRows = require('./TableRows');

var DataTable = NestedModel.extend({
   template: {
      'rows': TableRows
   },
   parse : function(response){
      return this._super( { 'rows': response } );
   }
});

module.exports = DataTable;
