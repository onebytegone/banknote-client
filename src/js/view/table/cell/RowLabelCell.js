/**
 * Cell used for showing the row label
 *
 * Copyright 2015 Ethan Smith
 */

var TextCell = require('./TextCell');

var RowLabelCell = TextCell.extend({
   className: 'rowLabel'
});

module.exports = RowLabelCell;
