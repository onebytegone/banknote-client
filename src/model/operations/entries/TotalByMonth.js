var _ = require('underscore'),
    AmountEntry = require('../../AmountEntry'),
    AmountEntryCollection = require('../../AmountEntryCollection'),
    StatementsByFilter = require('../statements/StatementsByFilter');

var TotalByMonth = function() { };

TotalByMonth.prototype = {
   /**
    * Creates a collection with a entry for each month. The
    * value in the entry is the sum of the amounts for that
    * month. The date will be the first day of the month.
    *
    * @param entries AmountEntryCollection
    * @return AmountEntryCollection
    */
   run: function(entries) {
      var monthlyStatements = (new StatementsByFilter()).run(entries, function(entry) {
         return entry.getDateOfMonth();
      });

      var summedEntries = monthlyStatements.map(function(statement) {
         return new AmountEntry({
            'date': statement.get('key'),
            'amount': statement.get('entries').sumEntries()
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

      // Make sure to sort by month, otherwise unexpected results
      // from the "fill in months" code may result.
      summedEntries = _.sortBy(summedEntries, function(entry) {
         return entry.getMonth();
      });

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

      return new AmountEntryCollection(filledSet);
   }
};

module.exports = TotalByMonth;
