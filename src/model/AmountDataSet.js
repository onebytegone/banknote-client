var Backbone = require('backbone'),
    AmountEntryCollection = require('./AmountEntryCollection');

var AmountDataSet = Backbone.Model.extend({
   defaults: {
      entries: new AmountEntryCollection(),
      name: ''
   }
});

module.exports = AmountDataSet;
