/**
 * Handles the addition of a set of entries to another
 * set of entries
 *
 * Copyright 2015 Ethan Smith
 */

var _ = require('underscore'),
    AmountEntryCollection = require('../../AmountEntryCollection');

var LinearEntrySum = function() { };

LinearEntrySum.prototype = {
   /**
    * This adds each entry in `augendEntries` to the entry
    * with the same index in `addendEntries`. Both `augendEntries`
    * and `addendEntries` should have the same amount of items
    *
    * @param augendEntries AmountEntryCollection
    * @param addendEntries AmountEntryCollection
    * @return AmountEntryCollection
    */
   run: function(augendEntries, addendEntries) {
      if (augendEntries.length !== addendEntries.length) {
         throw new Error("Given entry items do not have the same amount of items.");
      }

      var summedEntryList = augendEntries.map(function(entry, index) {
         var forged = entry.clone(),
             moneyStack = _.clone(forged.get('amount'));

         moneyStack.set(moneyStack.get() + addendEntries.at(index).get('amount').get());
         forged.set('amount', moneyStack);

         return forged;
      });

      return new AmountEntryCollection(summedEntryList);
   }
};

module.exports = LinearEntrySum;
