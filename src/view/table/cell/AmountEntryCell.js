/**
 * Cell used for showing an AmountEntry
 *
 * Copyright 2015 Ethan Smith
 */

var TableCell = require('../TableCell');

var AmountEntryCell = TableCell.extend({
   className: function() {
      return this.model.get('amount').get() === 0 ? 'zero' : '';
   },
   _renderContent: function() {
      return this.model.get('amount').readable();
   }
});

module.exports = AmountEntryCell;
