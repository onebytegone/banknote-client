/**
 * Cell used for showing the row label
 *
 * Copyright 2015 Ethan Smith
 */

var TableCell = require('../TableCell');

var RowLabelCell = TableCell.extend({
   className: 'rowLabel',
   _renderContent: function() {
      return this.model.get('text');
   }
});

module.exports = RowLabelCell;
