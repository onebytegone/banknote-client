/**
 * Creates a toolbar button that is represented by
 * an icon, e.g. add button.
 *
 * Copyright 2015 Ethan Smith
 */

 var Backbone = require('backbone'),
     Marionette = require('backbone.marionette');

var ToolbarItem = Marionette.ItemView.extend({
   template: '<div><a><i class="fa <%- icon %>"></i></a></div>',
   className: 'toolbarItem',
   model: new Backbone.Model({
      'icon': 'fa-plus'
   }),

   onRender: function() {
      var self = this;
      this.$el.find('a').on('click', function() {
         self.trigger('element:click', self);
      });
   }
});

module.exports = ToolbarItem;
