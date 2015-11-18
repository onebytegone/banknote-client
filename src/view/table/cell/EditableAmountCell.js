/**
 * Cell used for showing and allowing the editing of an AmountEntry
 *
 * Copyright 2015 Ethan Smith
 */

var $ = require('jquery'),
    AmountEntryCell = require('./AmountEntryCell');

var EditableAmountCell = AmountEntryCell.extend({

   render: function() {
      var self = this;
      this._super();

      this.$el.on('blur', 'input', function() {
         var originalHash = self.model.hash();
         self.model.get('amount').set($(this).val());
         self.trigger('editing:ended', originalHash, self.model);
      });
   },

   _renderContent: function() {
      var elem = $('<input />').attr({
         type: 'text',
         value: this.model.get('amount').readable(),
         class: 'jsCurrency'
      });

      return $('<div>').append(elem.clone()).html();
   }
});

module.exports = EditableAmountCell;
