/**
 * Copyright 2015 Ethan Smith
 */

var _ = require('underscore'),
    Backbone = require('backbone'),
    ControlBones = require('./ControlBones'),

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
         collection: null,
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
   }
});

module.exports = EntryListController;
