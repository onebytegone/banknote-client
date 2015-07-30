var Backbone = require('backbone'),
    AmountEntryCollection = require('./AmountEntryCollection');

var Statement = Backbone.Model.extend({
   defaults: {
      tag: '',
      collection: new AmountEntryCollection()
   }
});

module.exports = Statement;
