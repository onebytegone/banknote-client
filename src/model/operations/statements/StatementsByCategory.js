var _ = require('underscore'),
    StatementsByFilter = require('./StatementsByFilter');

var StatementsByCategory = function() { };

StatementsByCategory.prototype = {
   /**
    * This converts an AmountEntryCollection into a set of Statements
    * based on what category is stored for the entry.
    *
    * @param entries AmountEntryCollection
    * @param categoryPreference [String]
    * @return StatementCollection
    */
   run: function(entries, categoryPreference) {
      var shouldUsePreference = categoryPreference && categoryPreference.length > 0;

      return (new StatementsByFilter()).run(entries, function(entry) {
         // Only allow categories that are in the preference to be added
         var category = entry.get('category');
         return shouldUsePreference && _.indexOf(categoryPreference, category) === -1 ? false : category;
      });
   }
};

module.exports = StatementsByCategory;
