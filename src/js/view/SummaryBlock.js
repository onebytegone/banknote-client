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
      "toolbar": ".toolbar",
   },
   className: function() {
      return ('summaryBlock ' + this.model.get('nestDepth') + ' ' + this.model.get('classes')).trim();
   }
});

module.exports = SummaryBlock;
