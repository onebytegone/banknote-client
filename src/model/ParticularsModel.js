var Backbone = require('backbone'),
    AmountEntryCollection = require('./AmountEntryCollection');

var ParticularsModel = Backbone.Model.extend({
   defaults: {
      dataset: new AmountEntryCollection(),
      name: '',
      displayType: null,
      editable: true,
      showsTotal: true,
      classes: ''
   }
});

module.exports = ParticularsModel;
