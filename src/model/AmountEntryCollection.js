var Backbone = require('backbone'),
    _ = require('underscore'),
    AmountEntry = require('./AmountEntry'),
    MoneyStack = require('moneystack');

var AmountEntryCollection = Backbone.Collection.extend({
   model: AmountEntry,

   /**
    * Returns the sum of all the amounts of stored entries
    *
    * @return MoneyStack
    */
   sumEntries: function() {
      var value = this.reduce(function(carry, entry) {
         return carry.plus(entry.get('amount'));
      }, new MoneyStack(0));

      return value;
   }
});

module.exports = AmountEntryCollection;
