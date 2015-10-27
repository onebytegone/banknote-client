/**
 * Cell used for showing the label for the given Statement
 *
 * Copyright 2015 Ethan Smith
 */

var TableCell = require('../TableCell');

var StatementLabelCell = TableCell.extend({
   className: 'statementLabel',
   _renderContent: function() {
      return this.model.get('key');
   }
});

module.exports = StatementLabelCell;
