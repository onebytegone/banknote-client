var Backbone = require('backbone'),
    _ = require('underscore'),
    Statement = require('./Statement');

var StatementCollection = Backbone.Collection.extend({
   model: Statement
}, {
   generateFromAmountEntryCollection: function(entryCollection, filter) {
      var collectionList = entryCollection.collectionsByFilter(filter);
      return _.reduce(collectionList, function(carry, collection, key) {
         carry.add(new Statement({
            'key': key,
            'entries': collection
         }));

         return carry;
      }, new StatementCollection());
   },

   divideByCategories: function(entryCollection) {
      return this.generateFromAmountEntryCollection(entryCollection, function(entry) {
         return entry.get('category');
      });
   }
});

module.exports = StatementCollection;
