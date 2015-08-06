var TableBones = require('./TableBones'),
    MonthlyTableRow = require('./rows/MonthlyTableRow');

var MonthlyTable = TableBones.extend({
   template: '#template-monthlytable',
   childView: MonthlyTableRow,
   childViewOptions: function() {
      return {
         'showsTotal': this.options.showsTotal
      };
   },

   templateHelpers: function () {
      var self = this;
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
         ],
         getOption: function(option) {
            return self.options[option];
         }
      };
   }
});

module.exports = MonthlyTable;
