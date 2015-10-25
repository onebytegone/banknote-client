var Marionette = require('backbone.marionette'),
    RowLabelCell = require('./cell/RowLabelCell');

var TableRow = Marionette.ItemView.extend({
   tagName: 'tr',

   prependCellType: RowLabelCell,
   appendCellType: RowLabelCell,
   cellType: RowLabelCell,

   render: function() {
      var self = this;

      // Render the prepended cell if the type is set
      // and we have an entry for it in the model
      this._appendCell(this.prependCellType, this.model.get('prepended'));

      // Render the main content for the row
      this.model.get('members').each(function(entry) {
         self._appendCell(self.cellType, {
            'entry': entry.get('amount')
         });
      });

      // Render the appended cell if the type is set
      // and we have an entry for it in the model
      this._appendCell(this.appendedCellType, this.model.get('appended'));
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
