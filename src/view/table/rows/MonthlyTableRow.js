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

      label = new RowLabelCell({
         model: {
            'text': this.model.get('key')
         }
      });
      label.render();
      this.$el.append(label.$el);

      if (entries) {
         entries.each(function(entry) {
            var cell = new AmountEntryCell({
               model: {
                  'entry': entry.get('amount')
               }
            });
            cell.render();
            self.$el.append(cell.$el);
         });
      }
   }
});

module.exports = MonthlyTableRow;
