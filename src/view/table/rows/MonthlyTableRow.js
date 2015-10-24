var Marionette = require('backbone.marionette'),
    RowLabelCell = require('../cell/RowLabelCell'),
    AmountEntryCell = require('../cell/AmountEntryCell');

var MonthlyTableRow = Marionette.ItemView.extend({
   tagName: 'tr',
   templateHelpers: function() {
      var self = this;
      return {
         addClassByAmount: function(amount) {
            return amount.get() === 0 ? 'zero' : '';
         },
         getOption: function(option) {
            return self.options[option];
         },
         getSharedOption: function(option) {
            return self.options.sharedOptions[option];
         },
         shouldShowTotal: function() {
            return self.options.sharedOptions.showsTotal && self.options.sharedOptions.editable === false;
         }
      };
   },
   render: function() {
      var self = this,
          entries = this.model.get('entries'),
          label;

      this._appendCell(RowLabelCell, {
         'text': this.model.get('key')
      });

      if (entries) {
         entries.each(function(entry) {
            self._appendCell(AmountEntryCell, {
               'entry': entry.get('amount')
            });
         });
      }

      if (entries && self.options.sharedOptions.showsTotal && self.options.sharedOptions.editable === false) {
         this._appendCell(AmountEntryCell, {
            'entry': entries.sumEntries()
         });
      }
   },

   _appendCell: function(type, model) {
      var cell = new type({
         'model': model
      });
      cell.render();
      this.$el.append(cell.$el);
   }
});

module.exports = MonthlyTableRow;
