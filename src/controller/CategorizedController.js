var _ = require('underscore'),
    Backbone = require('backbone'),
    ControlBones = require('./ControlBones'),
    TableView = require('../view/table/TableView'),
    TableRow = require('../view/table/TableRow'),
    TableBody = require('../view/table/TableBody'),
    TableRowModel = require('../model/table/TableRowModel'),
    StatementLabelCell = require('../view/table/cell/StatementLabelCell'),
    AmountEntryCell = require('../view/table/cell/AmountEntryCell'),
    StatementSumCell = require('../view/table/cell/StatementSumCell'),
    TableMonthRow = require('../view/table/rows/TableMonthRow'),
    SummaryBlock = require('../view/SummaryBlock'),
    AmountEntry = require('../model/AmountEntry'),
    AmountEntryCollection = require('../model/AmountEntryCollection'),
    StatementsByCategory = require('../model/operations/statements/StatementsByCategory'),
    TotalByMonth = require('../model/operations/entries/TotalByMonth');

var CategorizedController = ControlBones.extend({
   title: 'Categorized Table',

   parseData: function(rawData) {
      var collection = new AmountEntryCollection(_.map(rawData, function(note) {
         return new AmountEntry(note);
      }));

      return (new StatementsByCategory()).run(collection);
   },

   render: function(rawData) {
      var self = this,
          categorized = this.parseData(rawData),
          rowData = categorized.at(0);

      var summary = new SummaryBlock({
         model: new Backbone.Model({
            'header': this.title
         })
      });

      var table = new TableView({
         collection: new Backbone.Collection([
            new TableRowModel({
               prepended: rowData,
               members: (new TotalByMonth()).run(rowData.get('entries')),
               appended: rowData
            }),
            new TableRowModel({
               prepended: rowData,
               members: (new TotalByMonth()).run(rowData.get('entries')),
               appended: rowData
            })
         ]),
         childViewOptions: {
            prependCellType: StatementLabelCell,
            cellType: AmountEntryCell,
            appendCellType: StatementSumCell
         }
      });

      summary.on('show', function() {
         summary.content.show(table);
      });

      return summary;
   },

   _generateHeader: function() {
      return new TableMonthRow({
         prependedModel: new Backbone.Model(),
         appendedModel: new Backbone.Model({
            'text': 'Yearly'
         })
      });
   }
});

module.exports = CategorizedController;
