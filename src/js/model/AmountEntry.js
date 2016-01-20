/**
 * `AmountEntry` is used to store the data for a single
 * event. An event can be a single expense, income amount,
 * or a total such as income for a month.
 *
 * Copyright 2015 Ethan Smith
 */

var Backbone = require('backbone'),
    MoneyStack = require('moneystack'),
    crypto = require('crypto');

var AmountEntry = Backbone.Model.extend({
   defaults: {
      amount: 0,
      name: '',
      date: '',
      category: 'unknown'
   },

   initialize: function(){
      if (typeof this.get('amount') !== 'object') {
         this.set('amount', new MoneyStack(this.get('amount')));
      }

      this.set('date', this.sanitizeDate(this.get('date')));
   },

   sanitizeDate: function(dateStr) {
      var date = new Date(dateStr.replace('-', '/'));
      if (!date.getTime()) {
         return false;
      }

      return (date.getMonth() + 1) + '/' + date.getDate();
   },

   toJSON: function() {
      var json = this._super();

      // Use the numerical value rather than the MoneyStack object
      json.amount = this.get('amount').get();

      return json;
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
   },

   hash: function() {
      return crypto.createHash('md5').update(String(this.get('amount').stored) + this.get('name') + this.get('date') + this.get('category')).digest("hex");
   }
});

module.exports = AmountEntry;
