/**
 * Cell used for showing the row label
 *
 * Copyright 2015 Ethan Smith
 */

var Marionette = require('backbone.marionette'),
    $ = require('jquery');

var RowLabelCell = Marionette.ItemView.extend({
   tagName: 'td',
   render: function() {
      this.$el.html(this.model.text);
   }
});

module.exports = RowLabelCell;
