var _ = require('underscore'),
    StatementsByFilter = require('./StatementsByFilter'),
    AmountEntryCollection = require('../../AmountEntryCollection'),
    Statement = require('../../Statement');

/**
 * @param categoryField String - Field to use as the Statment key
 */
var StatementsByCategory = function(categoryField) {
   this.field = categoryField || 'category';
};

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
      var self = this,
          shouldUsePreference = categoryPreference && categoryPreference.length > 0,
          statements;

      statements = (new StatementsByFilter()).run(entries, function(entry) {
         // Only allow categories that are in the preference to be added
         var category = entry.get(self.field);
         return shouldUsePreference && _.indexOf(categoryPreference, category) === -1 ? false : category;
      });

      if (shouldUsePreference) {
         var categoriesPresent = statements.pluck('key'),
             categoriesMissing = _.difference(categoryPreference, categoriesPresent);

         // Fill in categories mentioned in categoryPreference
         // but don't have any entries currently
         _.each(categoriesMissing, function(categoryKey) {
            statements.add(new Statement({
               'key': categoryKey,
               'entries': new AmountEntryCollection()
            }));
         });
      }

      return statements;
   }
};

module.exports = StatementsByCategory;
