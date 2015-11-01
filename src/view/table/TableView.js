/**
 * A view to render the base structure for a table
 *
 * Copyright 2015 Ethan Smith
 */

var Marionette = require('backbone.marionette');

var TableView = Marionette.LayoutView.extend({
   tagName: 'table',
   template: '#template-tableview',
   regions: {
      "header": "thead",
      "body": "tbody",
   }
});

module.exports = TableView;
