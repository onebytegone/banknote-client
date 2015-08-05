var Marionette = require('backbone.marionette');

var MonthlyTableRow = Marionette.ItemView.extend({
   template: '#template-monthlytablerow',
   tagName: 'tr',
   templateHelpers: function() {
      return {
         addClassByAmount: function(amount) {
            return amount.get() === 0 ? 'zero' : '';
         }
      };
   }
});

module.exports = MonthlyTableRow;
