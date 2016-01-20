/**
 * Cell used for showing a text value
 *
 * Copyright 2015 Ethan Smith
 */

var TableCell = require('../TableCell');

var TextCell = TableCell.extend({
   className: 'textCell',
   _renderContent: function() {
      return this.model.get('text');
   }
});

module.exports = TextCell;
