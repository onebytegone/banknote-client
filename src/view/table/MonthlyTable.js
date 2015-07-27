var TableBones = require('./TableBones'),
    ListItem = require('../ListItem');

var MonthlyTable = TableBones.extend({
   template: '#template-monthlytable',
   childView: ListItem,
});

module.exports = MonthlyTable;
