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
      var dateStr = this.get('date');

      // Custom handling for 'mm/dd'
      if (dateStr.match( /\d{1,2}\/\d{1,2}/i)) {
         return parseInt(dateStr.split('/')[0]);
      }

      return new Date(dateStr).getMonth() + 1;
   }
});

module.exports = AmountEntry;
