var Marionette = require('backbone.marionette');

var MonthlyTableRow = Marionette.ItemView.extend({
  template: '#template-monthlytablerow',
  tagName: 'tr'
});

module.exports = MonthlyTableRow;
