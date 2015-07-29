var Backbone = require('backbone'),
    _ = require('underscore'),
    AmountEntry = require('./AmountEntry'),
    MoneyStack = require('moneystack');

var AmountEntryCollection = Backbone.Collection.extend({
   model: AmountEntry,

   /**
    * Returns the sum of all the amounts of stored entries
    *
    * @return MoneyStack
    */
   sumEntries: function() {
      var value = this.reduce(function(carry, entry) {
         return carry.plus(entry.get('amount'));
      }, new MoneyStack(0));

      return value;
   },

   /**
    * Returns a filtered array of AmountEntryCollections.
    *
    * The filter function can return a string for the entry
    * to be categorized under in the output. Another option
    * is to return a falsey value which will cause the entry
    * to not appear in the output.
    *
    * @param function(AmountEntry) returns String or falsey
    * @return {key: AmountEntryCollection}
    */
   collectionsByFilter: function(filter) {
      return this.reduce(function(carry, entry) {
         var key = filter(entry);
         if (key) {
            if (!(key in carry)) {
               carry[key] = new AmountEntryCollection();
            }

            carry[key].add(entry);
         }
         return carry;
      }, {});
   },

   /**
    * Creates a collection with a entry for each month. The
    * value in the entry is the sum of the amounts for that
    * month. The date will be for the first.
    *
    * @return AmountEntryCollection
    */
   monthlySummary: function() {
      var output = new AmountEntryCollection();

      var monthlyCollections = this.collectionsByFilter(function(entry) {
         return entry.getDateOfMonth();
      });

      var summedEntries = _.map(monthlyCollections, function(collection, key) {
         return new AmountEntry({
            'date': key,
            'amount': collection.sumEntries()
         });
      });

      output.add(summedEntries);

      return output;
   }
});

module.exports = AmountEntryCollection;
