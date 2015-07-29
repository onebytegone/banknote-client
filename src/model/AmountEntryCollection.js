var Backbone = require('backbone'),
    AmountEntry = require('./AmountEntry'),
    MoneyStack = require('moneystack');

var AmountEntryCollection = Backbone.Collection.extend({
   model: AmountEntry,

   yearlyTotal: function() {
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
   }
});

module.exports = AmountEntryCollection;
