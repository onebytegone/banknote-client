var Backbone = require('backbone'),
    AmountEntryCollection = require('./AmountEntryCollection');

var Statement = Backbone.Model.extend({
   defaults: {
      key: '',
      entries: new AmountEntryCollection()
   }
});

module.exports = Statement;
