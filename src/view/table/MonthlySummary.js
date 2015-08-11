var $ = require('jquery'),
    MonthlyTable = require('./MonthlyTable'),
    MonthlySummaryRow = require('./rows/MonthlySummaryRow');

var MonthlySummary = MonthlyTable.extend({
   template: '#template-monthlysummary',
   childView: MonthlySummaryRow,

   attachHtml: function(collectionView, itemView) {
      collectionView.$('.output').append(itemView.el);
   }
});

module.exports = MonthlySummary;
