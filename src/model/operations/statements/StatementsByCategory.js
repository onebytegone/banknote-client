var StatementsByFilter = require('./StatementsByFilter');

var StatementsByCategory = function() { };

StatementsByCategory.prototype = {
   /**
    * This converts an AmountEntryCollection into a set of Statements
    * based on what category is stored for the entry.
    *
    * @param entries AmountEntryCollection
    * @return StatementCollection
    */
   run: function(entries) {
      return (new StatementsByFilter()).run(entries, function(entry) {
         return entry.get('category');
      });
   }
};

module.exports = StatementsByCategory;
