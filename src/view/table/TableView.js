/**
 * A view to render the base structure for a table
 *
 * Copyright 2015 Ethan Smith
 */

var Marionette = require('backbone.marionette'),
    TableRow = require('./TableRow');

var TableView = Marionette.CompositeView.extend({
   tagName: 'table',
   template: '#template-tableview',
   childView: TableRow,
   childViewContainer: "tbody",
   options: {
      header: null
   },
   onRender: function() {
      if (this.options.header) {
         this.options.header.render();
         this.$el.find('thead').append(this.options.header.$el);
      }
   }
});

module.exports = TableView;
