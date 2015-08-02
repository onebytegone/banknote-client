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

      var getLastMonthListed = function (entries) {
         var lastItem = _.last(entries);
         return lastItem ? lastItem.getMonth() : 0;
      };

      /**
       * `startingMonth` and `endingMonth` are inclusive
       */
      var generateMissingMonths = function (startingMonth, endingMonth) {
         return _.map(_.range(startingMonth, endingMonth+1), function (month) {
            return new AmountEntry({
               'date': month + '/1'
            });
         });
      };

      // Fill in missing months
      var filledSet = _.reduce(summedEntries, function(carry, entry) {
         var missingMonths = generateMissingMonths(getLastMonthListed(carry)+1, entry.getMonth()-1);
         carry = carry.concat(missingMonths);

         carry.push(entry);
         return carry;
      }, []);

      if (filledSet.length < 12) {
         filledSet = filledSet.concat(generateMissingMonths(getLastMonthListed(filledSet)+1, 12));
      }

      output.add(filledSet);

      return output;
   }
});

module.exports = AmountEntryCollection;
