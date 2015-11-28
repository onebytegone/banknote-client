/**
 * Controls the creation of a table that renders the entries by month
 * by category with a yearly total for the category.
 *
 * Copyright 2015 Ethan Smith
 */

var _ = require('underscore'),
    Backbone = require('backbone'),
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

   // Views
   summaryBlock: null,  // SummaryBlock
   table: null,  // TableView

   /**
    * @param collection AmountEntryCollection
    * @return SummaryBlock
    */
   render: function(collection, supplementary) {
      var self = this,
          categoryPreference = supplementary ? _.pluck(supplementary.categories || [], 'key') : [],
          categorized = (new StatementsByCategory()).run(collection, categoryPreference);

      this.summaryBlock = new SummaryBlock({
         model: this._createSummaryModel()
      });

      this.table = new TableView({
         collection: this._createTableCollection(categorized),
         childViewOptions: {
            prependCellType: StatementLabelCell,
            cellType: this.editable ? EditableAmountCell : AmountEntryCell,
            appendCellType: this.hasSummary ? StatementSumCell : null
         },
         header: this._generateHeader(),
         className: this.editable ? 'editable' : ''
      });

      this.summaryBlock.on('show', function() {
         self.summaryBlock.content.show(self.table);
      });

      this._bindEditableEvents(collection);

      return this.summaryBlock;
   },

   _bindEditableEvents: function(model) {
      var self = this;
      this.table.on('bn:model:updated', function(originalHash, updatedModel) {
         console.log('event');
         var found = model.findEntryWithHash(originalHash);
         if (found) {
            model.remove(found);
         }

         model.add(updatedModel);

         self.trigger('collection:updated', model);
      });
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
         members: (new TotalByMonth({
            'category': row.get('key')
         })).run(row.get('entries')),
         appended: row
      });
   }
});

module.exports = CategorizedController;
