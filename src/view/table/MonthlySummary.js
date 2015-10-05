var $ = require('jquery'),
    MonthlyTable = require('./MonthlyTable'),
    MonthlySummaryRow = require('./rows/MonthlySummaryRow');

var MonthlySummary = MonthlyTable.extend({
   template: '#template-monthlysummary',
   childView: MonthlySummaryRow,
   targetElement: '.output',

   allowsAddButton: function() {
      return false;
   }
});

module.exports = MonthlySummary;
