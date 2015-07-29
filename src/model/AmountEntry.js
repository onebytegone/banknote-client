var Backbone = require('backbone'),
    MoneyStack = require('moneystack');

var AmountEntry = Backbone.Model.extend({
   defaults: {
      amount: new MoneyStack(),
      name: '',
      date: '',
      category: ''
   },

   getDateOfMonth: function () {
      return (new Date(this.get('date')).getMonth() + 1) + '/1';
   }
});

module.exports = AmountEntry;
