/**
 * A view to render a group of table rows
 *
 * Copyright 2015 Ethan Smith
 */

var Marionette = require('backbone.marionette'),
    TableRow = require('./TableRow');

var TableBody = Marionette.CollectionView.extend({
   childView: TableRow,
   onRender: function() {
      this.$el = this.$el.children();
      this.$el.unwrap();
      this.setElement(this.$el);
   }
});

module.exports = TableBody;
