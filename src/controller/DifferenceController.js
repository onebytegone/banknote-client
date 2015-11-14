/**
 * Controls the creation of a table that shows the monthly amount
 * difference between two AmountEntryCollections.
 *
 * Copyright 2015 Ethan Smith
 */

var _ = require('underscore'),
    Backbone = require('backbone'),
    ControlBones = require('./ControlBones'),
    AmountEntry = require('../model/AmountEntry'),
    ParticularsModel = require('../model/ParticularsModel'),
    StatementCollection = require('../model/StatementCollection'),
    StatementsByCategory = require('../model/operations/statements/StatementsByCategory'),
    TotalByMonth = require('../model/operations/entries/TotalByMonth'),
    EntryCollectionNegator = require('../model/operations/entries/EntryCollectionNegator'),
    LinearEntrySum = require('../model/operations/entries/LinearEntrySum'),
    TableRowModel = require('../model/table/TableRowModel'),
    TableView = require('../view/table/TableView'),
    TableRow = require('../view/table/TableRow'),
    AmountEntryCell = require('../view/table/cell/AmountEntryCell'),
    TableMonthRow = require('../view/table/rows/TableMonthRow'),
    SummaryBlock = require('../view/SummaryBlock');


var DifferenceController = ControlBones.extend({
   title: 'Difference Table',
   editable: false,  // Editable is not supported by this type

   /**
    * @param collections Array - Example:
    * {
    *    'minuend': AmountEntryCollection,
    *    'subtrahend': AmountEntryCollection
    * }
    */
   render: function(collections) {
      var self = this;

      // Convert the individual AmountEntry items to a set of monthly
      var minuendMonthy = (new TotalByMonth()).run(collections.minuend);

      // Convert the individual AmountEntry items to a set of monthly
      var subtrahendMonthy = (new TotalByMonth()).run(collections.subtrahend);

      // Create the negated version so addition later works as subtraction
      subtrahendMonthy = (new EntryCollectionNegator()).run(subtrahendMonthy);

      // Add the two collections together
      var differenceMonthly = (new LinearEntrySum()).run(minuendMonthy, subtrahendMonthy);

      // Create table for the difference ouput
      var table = new TableView({
         collection: this._createTableCollection(differenceMonthly),
         childViewOptions: {
            prependCellType: null,
            cellType: AmountEntryCell,
            appendCellType: null
         },
         header: self._generateHeader()
      });

      // Assemble summary block
      var summary = new SummaryBlock({
         model: this._createSummaryModel()
      });

      summary.on('show', function() {
         summary.content.show(table);
      });

      return summary;
   },

   _generateHeader: function() {
      return new TableMonthRow();
   },

   /**
    * @param collection StatementCollection
    * @return Backbone.Collection
    */
   _createTableCollection: function(collection) {
      return new Backbone.Collection(this._createRowModel(collection));
   },

   /**
    * @param row Backbone.Collection
    * @return TableRowModel
    */
   _createRowModel: function(row) {
      return new TableRowModel({
         members: row
      });
   }
});

module.exports = DifferenceController;
