/**
 * A view to render the base structure for an element
 * of content with an associated header.
 *
 * Copyright 2015 Ethan Smith
 */

var Marionette = require('backbone.marionette');

var SummaryBlock = Marionette.LayoutView.extend({
   tagName: 'div',
   template: '#template-summaryblock',
   regions: {
      "content": ".content",
   },
   className: function() {
      return this.model.get('classes');
   }
});

module.exports = SummaryBlock;
