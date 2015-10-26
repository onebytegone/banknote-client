/**
 * Cell used for showing the summed total for the given Statement
 *
 * Copyright 2015 Ethan Smith
 */

var AmountEntryCell = require('./AmountEntryCell');

var StatementSumCell = AmountEntryCell.extend({
   className: 'statementSum',
   _readableAmount: function() {
      return this.model.get('entries').sumEntries().readable();
   }
});

module.exports = StatementSumCell;
