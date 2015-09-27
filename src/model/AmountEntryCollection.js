/**
 * `AmountEntryCollection` is a set of `AmountEntry`s. For example,
 * this can represent a list of all expenses or a subset such as
 * the expenses for a month.
 *
 * Copyright 2015 Ethan Smith
 */

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
