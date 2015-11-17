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
         self.trigger('editing:ended', $(this));
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
