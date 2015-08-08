var Backbone = require('backbone'),
    MoneyStack = require('moneystack');

var AmountEntry = Backbone.Model.extend({
   defaults: {
      amount: new MoneyStack(),
      name: '',
      date: '',
      category: 'unknown'
   },

   getDateOfMonth: function () {
      return this.getMonth() + '/1';
   },

   getMonth: function () {
      return new Date(this.get('date')).getMonth() + 1;
   }
});

module.exports = AmountEntry;
