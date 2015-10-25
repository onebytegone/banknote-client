/**
 * Cell used for showing the label for the given Statement
 *
 * Copyright 2015 Ethan Smith
 */

var Marionette = require('backbone.marionette');

var StatementLabelCell = Marionette.ItemView.extend({
   tagName: 'td',
   className: 'statementLabel',
   render: function() {
      this.$el.html(this.model.get('key'));
   }
});

module.exports = StatementLabelCell;
