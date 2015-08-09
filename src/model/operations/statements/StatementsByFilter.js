var _ = require('underscore'),
    StatementCollection = require('../../StatementCollection'),
    Statement = require('../../Statement');

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
      collectionList = entries.collectionsByFilter(filter);
      _.reduce(collectionList, function(carry, found, key) {
         carry.add(new Statement({
            'key': key,
            'entries': found
         }));

         return carry;
      }, collection);

      return collection;
   }
};

module.exports = StatementsByFilter;
