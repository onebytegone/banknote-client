/**
 * Negates all the amounts for the given AmountEntryCollection.
 * This is helpful for when you want to subtract one collection
 * from another. ("Number + Negative number" is subtraction)
 *
 * Copyright 2015 Ethan Smith
 */

var _ = require('underscore'),
    AmountEntryCollection = require('../../AmountEntryCollection');

var EntryCollectionNegator = function() { };

EntryCollectionNegator.prototype = {
   /**
    * Takes a collection and creates a new collection that has each of the
    * entries with the negitive value of the original. e.g. 10 becomes -10
    *
    * @param entries AmountEntryCollection
    * @return AmountEntryCollection
    */
   run: function(entries) {
      var output = new AmountEntryCollection();

      var negatedEntryList = entries.map(function(entry) {
         var forged = entry.clone(),
             moneyStack = _.clone(forged.get('amount'));

         moneyStack.set(moneyStack.get() * -1);
         forged.set('amount', moneyStack);

         return forged;
      });

      return new AmountEntryCollection(negatedEntryList);
   }
};

module.exports = EntryCollectionNegator;
