/**
 * `Statement`s are used to tag an `AmountEntryCollection`.
 * This is helpful when you want to add data about the month itself
 * to an `AmountEntryCollection` containing the expenses for a month.
 *
 * Copyright 2015 Ethan Smith
 */

var Backbone = require('backbone'),
    AmountEntryCollection = require('./AmountEntryCollection');

var Statement = Backbone.Model.extend({
   defaults: {
      key: '',
      entries: new AmountEntryCollection()
   }
});

module.exports = Statement;
