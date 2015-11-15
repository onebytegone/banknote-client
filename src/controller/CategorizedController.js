/**
 * Controls the creation of a table that renders the entries by month
 * by category with a yearly total for the category.
 *
 * Copyright 2015 Ethan Smith
 */

var Backbone = require('backbone'),
    ControlBones = require('./ControlBones'),

    // Model
    StatementsByCategory = require('../model/operations/statements/StatementsByCategory'),
    TotalByMonth = require('../model/operations/entries/TotalByMonth'),
    TableRowModel = require('../model/table/TableRowModel'),

    // Views
    SummaryBlock = require('../view/SummaryBlock'),
    TableView = require('../view/table/TableView'),
    TableMonthRow = require('../view/table/rows/TableMonthRow'),
    StatementLabelCell = require('../view/table/cell/StatementLabelCell'),
    AmountEntryCell = require('../view/table/cell/AmountEntryCell'),
    EditableAmountCell = require('../view/table/cell/EditableAmountCell'),
    StatementSumCell = require('../view/table/cell/StatementSumCell');


var CategorizedController = ControlBones.extend({
   title: 'Categorized Table',
   editable: false,
   hasSummary: true,

   /**
    * @param collection AmountEntryCollection
    * @return SummaryBlock
    */
   render: function(collection) {
      var self = this,
          categorized = (new StatementsByCategory()).run(collection);

      var summary = new SummaryBlock({
         model: this._createSummaryModel()
      });

      var table = new TableView({
         collection: this._createTableCollection(categorized),
         childViewOptions: {
            prependCellType: StatementLabelCell,
            cellType: this.editable ? EditableAmountCell : AmountEntryCell,
            appendCellType: this.hasSummary ? StatementSumCell : null
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
         appendedModel: this.hasSummary ? new Backbone.Model({
            'text': 'Yearly'
         }) : null
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
