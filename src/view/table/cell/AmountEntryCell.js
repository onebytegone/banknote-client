/**
 * Cell used for showing an AmountEntry
 *
 * Copyright 2015 Ethan Smith
 */

var Marionette = require('backbone.marionette');

var AmountEntryCell = Marionette.ItemView.extend({
   tagName: 'td',
   className: function() {
      return this.model.entry.get() === 0 ? 'zero' : '';
   },
   render: function() {
      this.$el.html(this._readableAmount());
   },
   _readableAmount: function() {
      return this.model.entry.readable();
   }
});

module.exports = AmountEntryCell;
