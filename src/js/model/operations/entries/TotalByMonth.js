/**
 * Totals the AmountEntries in the given AmountEntryCollection
 * by month. Filling any missing months in with an AmountEntry
 * whose amount is 0. The totaled entries are dated the first
 * of the month, e.g. 3/1 for March
 *
 * Copyright 2015 Ethan Smith
 */

var _ = require('underscore'),
    AmountEntry = require('../../AmountEntry'),
    AmountEntryCollection = require('../../AmountEntryCollection'),
    StatementsByFilter = require('../statements/StatementsByFilter');

var TotalByMonth = function(monthDefaults) {
   this.monthDefaults = monthDefaults || {};
};

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
      var self = this;
      var monthlyStatements = (new StatementsByFilter()).run(entries, function(entry) {
         return entry.getDateOfMonth();
      });

      var summedEntries = monthlyStatements.map(function(statement) {
         var model = {
            'date': statement.get('key'),
            'amount': statement.get('entries').sumEntries()
         };
         _.defaults(model, self.monthDefaults);
         return new AmountEntry(model);
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
            var model = {
               'date': month + '/1'
            };
            _.defaults(model, self.monthDefaults);
            return new AmountEntry(model);
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
