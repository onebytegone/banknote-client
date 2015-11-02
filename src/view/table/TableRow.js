/**
 * Renders a set of table cells into a row. Allows rendering 
 * prepended and appended cells for labels.
 *
 * Copyright 2015 Ethan Smith
 */

var Marionette = require('backbone.marionette'),
    RowLabelCell = require('./cell/RowLabelCell');

var TableRow = Marionette.ItemView.extend({
   tagName: 'tr',

   options: {
      prependCellType: RowLabelCell,
      appendCellType: RowLabelCell,
      cellType: RowLabelCell,
   },

   render: function() {
      var self = this;

      Marionette.triggerMethodOn(this, 'before:render', this);

      // Render the prepended cell if the type is set
      // and we have an entry for it in the model
      this._appendCell(this.options.prependCellType, this.model.get('prepended'));

      // Render the main content for the row
      this.model.get('members').each(function(entry) {
         self._appendCell(self.options.cellType, entry);
      });

      // Render the appended cell if the type is set
      // and we have an entry for it in the model
      this._appendCell(this.options.appendCellType, this.model.get('appended'));

      Marionette.triggerMethodOn(this, 'render', this);
   },

   _appendCell: function(type, model) {
      if (!type || !model) {
         return;
      }

      var cell = new type({
         'model': model
      });
      cell.render();
      this.$el.append(cell.$el);
   }
});

module.exports = TableRow;
