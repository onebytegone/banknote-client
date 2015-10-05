var TableBones = require('./TableBones'),
    MonthlyTableRow = require('./rows/MonthlyTableRow');

var MonthlyTable = TableBones.extend({
   template: '#template-monthlytable',
   childView: MonthlyTableRow,

   templateHelpers: function () {
      var helpers = this._super();

      helpers.months = [
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
      ];

      return helpers;
   },

   allowsAddButton: function() {
      return false;
   }
});

module.exports = MonthlyTable;
