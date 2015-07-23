var Backbone = require('backbone'),
    ListView = require('../view/ListView'),
    AmountEntryCollection = require('./AmountEntryCollection');

var ParticularsModel = Backbone.Model.extend({
   defaults: {
      dataset: new AmountEntryCollection(),
      name: '',
      displayType: ListView,
   }
});

module.exports = ParticularsModel;
