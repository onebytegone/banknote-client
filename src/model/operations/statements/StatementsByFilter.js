var _ = require('underscore'),
    StatementCollection = require('../../StatementCollection'),
    Statement = require('../../Statement'),
    AmountEntryCollection = require('../../AmountEntryCollection');

var StatementsByFilter = function() { };

StatementsByFilter.prototype = {
   /**
    * This converts an AmountEntryCollection into a set of Statements
    * stored in a StatementCollection. This split is controlled by the
    * given filter.
    *
    * @param entries AmountEntryCollection
    * @param filter function(AmountEntry)->string
    * @return StatementCollection
    */
   run: function(entries, filter) {
      var collection = new StatementCollection(),
          collectionList;

      // rebuild data
      collectionList = this.collectionsByFilter(entries, filter);
      _.reduce(collectionList, function(carry, found, key) {
         carry.add(new Statement({
            'key': key,
            'entries': found
         }));

         return carry;
      }, collection);

      return collection;
   },

   /**
    * Returns a filtered array of AmountEntryCollections.
    *
    * The filter function can return a string for the entry
    * to be categorized under in the output. Another option
    * is to return a falsey value which will cause the entry
    * to not appear in the output.
    *
    * @param entries AmountEntryCollection
    * @param function(AmountEntry) returns String or falsey
    * @return {key: AmountEntryCollection}
    */
   collectionsByFilter: function(entries, filter) {
      return entries.reduce(function(carry, entry) {
         var key = filter(entry);
         if (key) {
            if (!(key in carry)) {
               carry[key] = new AmountEntryCollection();
            }

            carry[key].add(entry);
         }
         return carry;
      }, {});
   }
};

module.exports = StatementsByFilter;
