/**
 * `AmountEntry` is used to store the data for a single
 * event. An event can be a single expense, income amount,
 * or a total such as income for a month.
 *
 * Copyright 2015 Ethan Smith
 */

var Backbone = require('backbone'),
    MoneyStack = require('moneystack');

var AmountEntry = Backbone.Model.extend({
   defaults: {
      amount: new MoneyStack(),
      name: '',
      date: '',
      category: 'unknown'
   },

   initialize: function(){
      if (!(this.get('amount') instanceof MoneyStack)) {
         this.set('amount', new MoneyStack(this.get('amount')));
      }
   },

   getDateOfMonth: function () {
      return this.getMonth() + '/1';
   },

   getMonth: function () {
      var dateStr = this.get('date');

      // Custom handling for 'mm/dd'
      if (dateStr.match(/^\d{1,2}\/\d{1,2}$/i)) {
         return parseInt(dateStr.split('/')[0]);
      }

      return new Date(dateStr).getMonth() + 1;
   }
});

module.exports = AmountEntry;
