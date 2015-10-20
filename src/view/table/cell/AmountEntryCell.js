/**
 * Cell used for showing an AmountEntry
 *
 * Copyright 2015 Ethan Smith
 */

var Marionette = require('backbone.marionette');

var AmountEntryCell = Marionette.ItemView.extend({
   tagName: 'td',
   render: function() {
      this.$el.html(this.model.entry.readable());
   }
});

module.exports = AmountEntryCell;
