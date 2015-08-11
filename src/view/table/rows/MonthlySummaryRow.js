var MonthlyTableRow = require('./MonthlyTableRow');

var MonthlySummaryRow = MonthlyTableRow.extend({
   template: '#template-monthlysummaryrow',
   tagName: 'td'
});

module.exports = MonthlySummaryRow;
