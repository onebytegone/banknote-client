/**
 * A view to render the base structure for a table
 *
 * Copyright 2015 Ethan Smith
 */

var Marionette = require('backbone.marionette');

var SummaryBlock = Marionette.LayoutView.extend({
   tagName: 'div',
   template: '#template-summaryblock',
   regions: {
      "content": ".content",
   }
});

module.exports = SummaryBlock;
