/**
 * Creates a new collection of `AmountEntry` using the provided
 * modifier. This is simliar to the reduce function.
 *
 * Copyright 2015 Ethan Smith
 */

var _ = require('underscore'),
    AmountEntryCollection = require('../../AmountEntryCollection');

var EntriesBySequence = function() { };

EntriesBySequence.prototype = {
   /**
    * This calculates a new AmountEntryCollection based on the given sequence
    * modifier. This will loop through each element in the collection.
    *
    * @param entries AmountEntryCollection
    * @param step function(AmountEntry last, AmountEntry current)->AmountEntry
    * @param initial AmountEntry
    * @return AmountEntryCollection
    */
   run: function(entries, step, initial) {
      var collection = new AmountEntryCollection(),
          collectionList;

      entries.reduce(function(carry, entry) {
         var forged = step(carry, entry);
         if (forged) {
            collection.add(forged);
            return forged;
         }

         return entry;
      }, initial);

      return collection;
   }
};

module.exports = EntriesBySequence;
