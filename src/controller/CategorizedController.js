var _ = require('underscore'),
    Backbone = require('backbone'),
    ControlBones = require('./ControlBones'),
    TableView = require('../view/table/TableView'),
    TableRow = require('../view/table/TableRow'),
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
          categorized = this.parseData(rawData);

      var summary = new SummaryBlock({
         model: this._createSummaryModel()
      });

      var table = new TableView({
         collection: this._createTableCollection(categorized),
         childViewOptions: {
            prependCellType: StatementLabelCell,
            cellType: AmountEntryCell,
            appendCellType: StatementSumCell
         },
         header: self._generateHeader()
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
   },

   /**
    * @return Backbone.Model
    */
   _createSummaryModel: function() {
      return new Backbone.Model({
         'header': this.title
      });
   },

   /**
    * @param collection StatementCollection
    * @return Backbone.Collection
    */
   _createTableCollection: function(collection) {
      return new Backbone.Collection(collection.map(this._createRowModel));
   },

   /**
    * @param row Statement
    * @return TableRowModel
    */
   _createRowModel: function(row) {
      return new TableRowModel({
         prepended: row,
         members: (new TotalByMonth()).run(row.get('entries')),
         appended: row
      });
   }
});

module.exports = CategorizedController;
