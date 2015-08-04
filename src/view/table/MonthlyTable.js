var TableBones = require('./TableBones'),
    MonthlyTableRow = require('./rows/MonthlyTableRow');

var MonthlyTable = TableBones.extend({
   template: '#template-monthlytable',
   childView: MonthlyTableRow,

   templateHelpers: function () {
      return {
         months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
         ]
      };
   }
});

module.exports = MonthlyTable;
