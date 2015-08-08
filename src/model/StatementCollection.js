var Backbone = require('backbone'),
    _ = require('underscore'),
    Statement = require('./Statement');

var StatementCollection = Backbone.Collection.extend({
   model: Statement,
   rebuildDataFromEntryCollection: function(entryCollection, filter) {
      var self = this,
          collectionList,
          updateCollection = function() {
             self.rebuildDataFromEntryCollection(entryCollection, filter);
          };

      this.reset();

      // rebuild data
      collectionList = entryCollection.collectionsByFilter(filter);
      _.reduce(collectionList, function(carry, collection, key) {
         carry.add(new Statement({
            'key': key,
            'entries': collection
         }));

         return carry;
      }, this);

      // bind to collection for updates
      entryCollection.on('change', updateCollection);
      entryCollection.on('remove', updateCollection);
      entryCollection.on('add', updateCollection);
   }
}, {
   generateFromAmountEntryCollection: function(entryCollection, filter) {
      var collection = new StatementCollection();
      collection.rebuildDataFromEntryCollection(entryCollection, filter);
      return collection;
   },

   divideByCategories: function(entryCollection) {
      return this.generateFromAmountEntryCollection(entryCollection, function(entry) {
         return entry.get('category');
      });
   }
});

module.exports = StatementCollection;
