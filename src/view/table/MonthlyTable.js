var TableBones = require('./TableBones'),
    ListItem = require('../ListItem');

var MonthlyTable = TableBones.extend({
   template: '#template-monthlytable',
   childView: ListItem,

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
