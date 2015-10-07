var TableBones = require('./TableBones'),
    MonthlyTableRow = require('./rows/MonthlyTableRow');

var MonthlyTable = TableBones.extend({
   template: '#template-monthlytable',
   childView: MonthlyTableRow,

   templateHelpers: function () {
      var self = this,
          helpers = this._super();

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

      helpers.shouldShowTotal = function() {
         return self.options.sharedOptions.showsTotal && self.options.sharedOptions.editable === false;
      };

      return helpers;
   },

   allowsAddButton: function() {
      return false;
   }
});

module.exports = MonthlyTable;
