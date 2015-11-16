/**
 * Cell used for showing and allowing the editing of an AmountEntry
 *
 * Copyright 2015 Ethan Smith
 */

var $ = require('jquery'),
    AmountEntryCell = require('./AmountEntryCell');

var EditableAmountCell = AmountEntryCell.extend({
   _renderContent: function() {
      var elem = $('<input />').attr({
         type: 'text',
         value: this.model.get('amount').readable()
      });

      return $('<div>').append(elem.clone()).html();
   }
});

module.exports = EditableAmountCell;
