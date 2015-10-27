/**
 * Base table cell
 *
 * Copyright 2015 Ethan Smith
 */

var Marionette = require('backbone.marionette');

var TableCell = Marionette.ItemView.extend({
   tagName: 'td',
   render: function() {
      this.$el.html(this._renderContent());
   },
   _renderContent: function() {
      return '';
   }
});

module.exports = TableCell;
