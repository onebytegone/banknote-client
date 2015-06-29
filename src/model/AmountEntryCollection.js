var Backbone = require('backbone'),
    AmountEntry = require('./AmountEntry');

var AmountEntryCollection = Backbone.Collection.extend({
   model: AmountEntry
});

module.exports = AmountEntryCollection;
