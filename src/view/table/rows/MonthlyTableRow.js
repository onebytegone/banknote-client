var Marionette = require('backbone.marionette');

var MonthlyTableRow = Marionette.ItemView.extend({
   template: '#template-monthlytablerow',
   tagName: 'tr',
   templateHelpers: function() {
      var self = this;
      return {
         addClassByAmount: function(amount) {
            return amount.get() === 0 ? 'zero' : '';
         },
         getOption: function(option) {
            return self.options[option];
         },
         getSharedOption: function(option) {
            return self.options.sharedOptions[option];
         }
      };
   }
});

module.exports = MonthlyTableRow;
