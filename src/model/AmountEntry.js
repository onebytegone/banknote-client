var Backbone = require('backbone'),
    MoneyStack = require('moneystack');

var AmountEntry = Backbone.Model.extend({
   defaults: {
      amount: new MoneyStack(),
      name: '',
      date: '',
      category: ''
   }
});

module.exports = AmountEntry;
