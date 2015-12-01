/**
 * Copyright 2015 Ethan Smith
 */

var _ = require('underscore'),
    Backbone = require('backbone'),
    ControlBones = require('./ControlBones'),

    // Model
    TableRowModel = require('../model/table/TableRowModel'),

    // Views
    SummaryBlock = require('../view/SummaryBlock'),
    TableView = require('../view/table/TableView'),
    TableRow = require('../view/table/TableRow'),
    TextCell = require('../view/table/cell/TextCell');

var EntryListController = ControlBones.extend({
   title: 'Entry List',
   columns: { },

   // Views
   summaryBlock: null,  // SummaryBlock
   table: null,  // TableView

   /**
    * @param collection AmountEntryCollection
    * @return SummaryBlock
    */
   render: function(collection) {
      var self = this;

      // Assemble summary block
      this.summaryBlock = new SummaryBlock({
         model: this._createSummaryModel()
      });

      this.table = new TableView({
         collection: this._createTableCollection(collection),
         childViewOptions: {
            prependCellType: null,
            cellType: TextCell,
            appendCellType: null
         },
         header: this._generateHeader()
      });

      this.summaryBlock.on('show', function() {
        self.summaryBlock.content.show(self.table);
      });

      return this.summaryBlock;
   },

   _generateHeader: function() {
      return new TableRow({
         model: new Backbone.Model({
            'members': new Backbone.Collection(
               _.map(_.keys(this.columns), function(name) {
                  return { 'text': name };
               }),
               Backbone.Model.extend({
                  'text': ''
               })
            )
         })
      });
   },

   /**
    * @param collection AmountEntryCollection
    * @return Backbone.Collection
    */
   _createTableCollection: function(collection) {
      return new Backbone.Collection(collection.map(this._createRowModel.bind(this)));
   },

   /**
    * @param row AmountEntry
    * @return TableRowModel
    */
   _createRowModel: function(row) {
      var self = this,
          columnModels;

      columnModels = _.map(_.values(this.columns), function(column) {
         return self._createModelForColumn(column, row);
      });

      return new TableRowModel({
         members: new Backbone.Collection(columnModels)
      });
   },

   _createModelForColumn: function(column, rowData) {
      return new Backbone.Model({
         'text': rowData.get(column)
      });
   }
});

module.exports = EntryListController;
